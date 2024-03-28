import * as React from "react";
import { AuthContext, AuthState, User } from "./auth-context";

const useAuth = (): {
  state: AuthState;
  login: (payload: { user: User; token: string }) => void;
  logout: () => void;
} => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};

export default useAuth;
