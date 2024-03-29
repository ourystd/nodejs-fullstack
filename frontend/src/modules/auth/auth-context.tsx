import * as React from "react";
import type { TAuthState, TUser } from "./context.types";

export const AuthContext = React.createContext<
  | {
      state: TAuthState;
      login: (payload: { user: TUser; token: string }) => void;
      logout: () => void;
    }
  | undefined
>(undefined);
