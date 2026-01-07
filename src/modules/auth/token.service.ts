import jwt from "jsonwebtoken";
import {prisma} from "../../lib/prisma";
import { TokenPayload } from "./auth.types";

export class TokenService {
    constructor (
        private readonly jwtAccessSecret : string,
        private readonly jwtRefreshSecret : string
    ) {}

    // generate access token
    generateAccessToken = (userId: string) : string => {
        return jwt.sign({id: userId}, this.jwtAccessSecret, {expiresIn: "15m"});
    };

    // generate refresh token
    generateRefreshToken = async (userId: string) : Promise<string> => {
        const token = jwt.sign({id: userId}, this.jwtRefreshSecret, {expiresIn: "7d"});

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await prisma.refreshToken.create({
            data: {
                token,
                userId,
                expiresAt
            }
        });

        return token;
    };

    // validate refresh token
    validateRefreshToken = async (token: string): Promise<TokenPayload | null>  => {

        try {

            const payload = jwt.verify(token, this.jwtRefreshSecret) as TokenPayload;

            const dbToken = await prisma.refreshToken.findUnique({
                where: {token}
            });

            if (!dbToken || dbToken.expiresAt < new Date()) {
                return null;
            };

            return payload;
        } catch (err) {
            return null;
        };
    };

    // delete refresh token
    deleteRefreshToken = async (token: string) : Promise<void> => {
        await prisma.refreshToken.delete({
            where: { token },
        }).catch(() => {});
    }
};