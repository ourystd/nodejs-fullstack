export interface TUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
}

export interface TAuthState {
  isAuthenticated: boolean;
  user: TUser | null;
  token: string | null;
}

export interface TAction {
  type: string;
  payload?: {
    user: TUser;
    token: string | null;
  };
}
