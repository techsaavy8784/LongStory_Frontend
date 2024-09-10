import { User } from "./user";

export type UpdatedUserProfile = {
  [key: string]: string | number | undefined | File;
  first_name?: string;
  last_name?: string;
  email?: string;
  country?: string;
  birthday?: string;
  phone?: string;
  is_private?: string;
  auth_status?: number;
  approved_status?: string;
  file?: File;
};

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: User | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  setUser: (user: User) => void;
  setToken: (
    tokenObj: { refresh: string; access: string },
    user: User
  ) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  resetPassword: (email: string) => void;
  updateProfile: (updatedUser: UpdatedUserProfile) => Promise<void>;
};
