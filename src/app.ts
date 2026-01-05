import { env } from "./config/env";
import express from 'express';
import { authRouter } from './modules/auth';

const app = express();

app.use(express.json());

app.use("/auth", authRouter(env.JWT_SECRET));

export { app };