import * as React from "react";

export interface User {
  username: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface Action {
  type: string;
  payload?: {
    user: User;
    token: string | null;
  };
}

export const AuthContext = React.createContext<
  | {
      state: AuthState;
      login: (payload: { user: User; token: string }) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state: AuthState, action: Action): AuthState => {
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
  }, []);

  const login = React.useCallback((payload: { user: User; token: string }) => {
    dispatch({ type: "LOGIN", payload });
  }, []);

  const value = React.useMemo(
    () => ({ state, login, logout }),
    [state, login, logout]
  );

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

export default AuthContextProvider;
