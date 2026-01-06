import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../middlewares/permission.middleware";
import { env } from "../../config/env";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PERMISSIONS } from "../auth/permissions";


export const userRouter = () => {
    const router = Router();
    const userService = new UserService();
    const userController = new UserController(userService);
    
    router.get("/me", AuthMiddleware(env.JWT_SECRET), userController.getMe);
    router.get("/admin-only", AuthMiddleware(env.JWT_SECRET), requirePermission(PERMISSIONS.ADMIN), userController.getAdminHello);

    return router;
};

