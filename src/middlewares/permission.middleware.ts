import { Request, Response, NextFunction } from "express";

export const requirePermission = (permission: number) =>
    (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            return res.status(401).json({message: "Unauthorized"});
        };

        const hasPermissions = (req.user.permissions && permission) == permission;

        if (!hasPermissions) {
            return res.status(403).json({message: "Forbidden"});
        };

        next();
    };