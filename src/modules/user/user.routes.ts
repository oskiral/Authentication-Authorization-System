import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { requirePermission } from "../../middlewares/permission.middleware";
import { env } from "../../config/env";
import { getMe, getAdminHello } from "./user.controller";
import { PERMISSIONS } from "../auth/permissions";


export const userRouter = () => {
    const router = Router();
    
    router.get("/me", AuthMiddleware(env.JWT_SECRET), getMe);
    router.get("/admin-only", AuthMiddleware(env.JWT_SECRET), requirePermission(PERMISSIONS.ADMIN), getAdminHello);

    return router;
};

