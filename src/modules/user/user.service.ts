import { prisma } from "../../lib/prisma"
import { CreateUserInput, UserDTO, UserAuthData } from "./user.types"

// user service
export class UserService {

    // create user
    async createUser(data: CreateUserInput): Promise<UserDTO> {
        const user = await prisma.user.create({
            data
        });

        return this.toDTO(user);
    };

    // get user by id
    async getUserById(id: string): Promise<UserDTO | null> {
        const user = await prisma.user.findUnique({
            where: {id}
        });

        return user ? this.toDTO(user) : null;
    };

    // get user by email
    async getUserByEmail(email: string): Promise<UserDTO | null> {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        return user ? this.toDTO(user) : null;
    };

    // get all users
    async listUsers(): Promise<UserDTO[]> {
        const users = await prisma.user.findMany();
        return users.map(this.toDTO);
    };

    // data transfer object of user
    private toDTO(user: any): UserDTO {
        return {
            id: user.id,
            email: user.email,
            permissions: user.permissions,
            createdAt: user.createdAt,
        };
    };

    async getUserAuthDataByEmail(email: string): Promise<UserAuthData | null> {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                passwordHash: true,
                permissions: true,
            },
        });
    }

};