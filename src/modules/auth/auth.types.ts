
// data required for login
export interface LoginInput {
  email: string;
  password: string;
};

// data required for register
export interface RegisterInput {
  email: string;
  password: string;
};

// access token given by server
export interface AuthResult {
  accessToken: string;
};