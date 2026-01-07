import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../user";
import { TokenService } from "./token.service";

// auth routes
export const authRouter = (jwtAcccessSecret: string, jwtRefreshSecret : string) => {
    const router = Router();

    const userService = new UserService();
    const tokenService = new TokenService(jwtAcccessSecret, jwtRefreshSecret);
    const authService = new AuthService(userService, tokenService);
    const authController = new AuthController(authService);


    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.post("/refresh", authController.refresh);

    return router;
};