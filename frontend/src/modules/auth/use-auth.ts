import * as React from "react";
import { AuthContext } from "./auth-context";
import type { TAuthState, TUser } from "./context.types";

const useAuth = (): {
  state: TAuthState;
  login: (payload: { user: TUser; token: string }) => void;
  logout: () => void;
} => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};

export default useAuth;
