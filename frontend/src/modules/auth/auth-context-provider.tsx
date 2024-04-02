import * as React from "react";
import type { TAction, TAuthState, TUser } from "./context.types";
import { AuthContext } from "./auth-context";

const initialState: TAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state: TAuthState, action: TAction): TAuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const logout = React.useCallback(() => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  }, []);

  const login = React.useCallback((payload: { user: TUser; token: string }) => {
    dispatch({ type: "LOGIN", payload });
  }, []);

  const value = React.useMemo(
    () => ({ state, login, logout }),
    [state, login, logout]
  );

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");
    if (user && token) {
      const payload = { user: JSON.parse(user), token };
      dispatch({ type: "LOGIN", payload });
    }
  }, []);

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

export default AuthContextProvider;
