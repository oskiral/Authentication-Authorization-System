import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { env } from "../../config/env";
import { getMe } from "./user.controller";

const router = Router();

router.get(
  "/me",
  AuthMiddleware(env.JWT_SECRET),
  getMe
);

export default router;
