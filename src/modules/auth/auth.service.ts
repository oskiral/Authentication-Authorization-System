import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserService } from "../user";
import { LoginInput, AuthResult } from "./auth.types";

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
            throw new Error("Invalid data");
        }

        // check if password is valid
        const isPasswordValid = bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new Error("Invalid data");
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
};