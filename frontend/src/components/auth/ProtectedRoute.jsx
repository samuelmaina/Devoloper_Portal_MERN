import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
const redirectUrl = "/log-in";

function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuth);
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
