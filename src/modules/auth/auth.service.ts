import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserService } from "../user";
import { LoginInput, AuthResult, RegisterInput } from "./auth.types";

// auth service
export class AuthService {
    
    constructor (
        private readonly userService : UserService,
        private readonly jwtSecret : string
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

        // generate access token
        const accessToken = jwt.sign(
            {
                userId: user.id,
                permissions: user.permissions
            },
            this.jwtSecret,
            {
                expiresIn: "15m"
            }
        )

        return {accessToken}
    }

    // register
    async register(input: RegisterInput) {
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
};