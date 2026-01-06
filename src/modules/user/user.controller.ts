import { Request, Response } from "express";
import { UserService } from "./user.service";

// user controller
export class UserController {
  constructor(private readonly userService: UserService) {}

  // /me endpoint logic
   getMe = async (req: Request, res: Response) => {


      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    

      const user = await this.userService.getUserById(req.user.id);

      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
      return res.json(user);

  };
  
  // i use this endpoint to test permissions feature
  getAdminHello = async (req: Request, res: Response) => {
    
    const adminId = req.user?.id;
  
    return res.status(200).json({
        message: "Hello Admin!",
        details: `You are logged in as user ${adminId} with full admin privileges.`
    });
  };
};