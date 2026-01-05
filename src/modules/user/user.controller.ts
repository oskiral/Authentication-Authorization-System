import { Request, Response } from "express";
import { userService } from "./user.service";

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await userService.getUserById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
};
