import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  children,
  redirectTo = "/",
}) {
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
}
