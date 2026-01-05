import { Request, Response } from "express";
import { AuthService } from "./auth.service";

// auth controller
export class AuthController {

    constructor ( private readonly authService: AuthService) {};

    // login endponit
    login = async (req: Request, res: Response) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message : "Email and password are required"
            });
        };

        try {
            const result = await this.authService.login({email, password});

            res.status(200).json(result);

        } catch(err) {
            res.status(401).json({
                message : "Invalid credentials"
            });
        };
    };
};