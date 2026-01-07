import { env } from "./config/env";
import express from 'express';
import { authRouter } from './modules/auth';
import { userRouter } from "./modules/user";

const app = express();

app.use(express.json());

app.use("/auth", authRouter(env.JWT_ACCESS_SECRET, env.JWT_REFRESH_SECRET));
app.use("/users", userRouter());

export { app };