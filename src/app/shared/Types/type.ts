export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  username: string;
  role: Role;
}

export type Role = 'ADMIN' | 'USER'

export interface AuthUser {
  username: string;
  role: Role;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}
