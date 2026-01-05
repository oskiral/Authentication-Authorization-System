import { Request, Response } from "express";
import { AuthService } from "./auth.service";

// auth controller
export class AuthController {

    constructor ( private readonly authService: AuthService) {};

    // login endpoint
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

    // register endpoint
    register = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        try {
            const user = await this.authService.register({ email, password });

            return res.status(201).json(user);
        } catch (err) {
            console.error("REGISTER ERROR:", err);
            if (err instanceof Error && err.message === "EMAIL_TAKEN") {
            return res.status(409).json({ message: "Email already in use" });
            }

            return res.status(500).json({ message: "Internal server error" });
        }
    };
};