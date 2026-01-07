
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

// user data
export interface UserBasicInfo {
  id: string;
  email: string;
  permissions: number;
}

// result of authentication
export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: UserBasicInfo;  
}

// token payload
export interface TokenPayload {
  id: string;
}

// access token & refresh token
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}