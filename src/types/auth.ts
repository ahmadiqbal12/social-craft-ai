export type UserRole = "admin" | "creator" | "subscriber";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  profileImage: File;
}

export type AuthStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AuthState {
  user: User | null;
  status: AuthStatus;
  /** true once the initial "who am I" check has resolved (success or fail) */
  initialized: boolean;
  error: string | null;
}
