import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
const redirectUrl = "/log-in";

//@ts-ignore
function ProtectedRoute({ children }) {
  const isAuth = useSelector((state:any) => state.auth.isAuth);
  const location = useLocation();
  return !isAuth ? (
    <Navigate to={redirectUrl} state={{ from: location }} replace />
  ) : children ? (
    children
  ) : (
    <Outlet />
  );
}

export default ProtectedRoute;
