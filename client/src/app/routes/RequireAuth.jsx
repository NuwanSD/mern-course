import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";

export default function RequireAuth() {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return <Outlet />;
}
