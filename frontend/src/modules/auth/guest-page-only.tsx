import { Navigate } from "react-router";
import useAuth from "./use-auth";

export function GestPageOnly({
  children: children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useAuth();
  return !state.isAuthenticated ? children : <Navigate to="/" replace />;
}
