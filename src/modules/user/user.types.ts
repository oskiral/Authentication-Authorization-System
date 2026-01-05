
// input data needed to create user
export interface CreateUserInput {
    email: string;
    passwordHash: string;
    permissions: number;
};

// data transfer object of user
export interface UserDTO {
    id: string;
    email: string;
    permissions: number;
    createdAt: Date;
};