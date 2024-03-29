import { Navigate } from "react-router";
import useAuth from "./use-auth";

export function RequireAuthPage({
  children: children,
}: {
  children: JSX.Element;
}) {
  const { state } = useAuth();
  return state.isAuthenticated ? children : <Navigate to="/login" replace />;
}
