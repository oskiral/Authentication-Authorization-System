import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../user";

// auth routes
export const authRouter = (jwtSecret: string) => {
    const router = Router();

    const userService = new UserService();
    const authService = new AuthService(userService, jwtSecret);
    const authController = new AuthController(authService);

    // login route
    router.post("/login", authController.login);

    return router;
};