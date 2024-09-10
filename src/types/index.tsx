import { User } from "./user";

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: User | null | undefined;
}
