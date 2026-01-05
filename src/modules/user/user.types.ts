
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

// interface used by AuthService in order to fetch password 
export interface UserAuthData {
  id: string;
  email: string;
  passwordHash: string;
  permissions: number;
}