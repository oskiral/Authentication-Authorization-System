import bcrypt from "bcrypt";
import { UserDTO, UserService } from "../user";
import { LoginInput, AuthResult, RegisterInput, AuthTokens } from "./auth.types";
import { TokenService } from "./token.service";

// auth service
export class AuthService {
    
    constructor (
        private readonly userService : UserService,
        private readonly tokenService : TokenService
    ) {};

    // login
    async login(input: LoginInput) : Promise<AuthResult> {
        const {email, password} = input;

        // fetch user by email
        const user = await this.userService.getUserAuthDataByEmail(email);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // check if password is valid
        const isPasswordValid = bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // generate access and refresh tokens
        const accessToken = this.tokenService.generateAccessToken(user.id);
        const refreshToken = await this.tokenService.generateRefreshToken(user.id);

        return {
            accessToken,
            refreshToken,
            user : {
                id: user.id,
                email: user.email,
                permissions: user.permissions
            }
        }
    }

    // register
    async register(input: RegisterInput) : Promise<UserDTO> {
        const { email, password} = input;

        const existingUser = await this.userService.getUserByEmail(email);
        if (existingUser) {
            throw new Error("EMAIL_TAKEN");
        };

        const passwordHash = await bcrypt.hash(password, 10);

        // create user
        const user = await this.userService.createUser({
            email,
            passwordHash,
            permissions: 0,
        });

        return user;
    };

    // refresh tokens
    async refreshTokens(oldRefreshToken: string) : Promise<AuthTokens> {
        
        const payload = await this.tokenService.validateRefreshToken(oldRefreshToken);

        if (!payload) {
            throw new Error("INVALID_TOKEN");
        };

        await this.tokenService.deleteRefreshToken(oldRefreshToken);

        const accessToken = this.tokenService.generateAccessToken(payload.id);
        const refreshToken = await this.tokenService.generateRefreshToken(payload.id);

        return {
            accessToken,
            refreshToken
        };
    };

    // logout
    async logout(refreshToken: string) : Promise<void> {
        try {
            await this.tokenService.deleteRefreshToken(refreshToken);
        } catch (err) {};
    };
};