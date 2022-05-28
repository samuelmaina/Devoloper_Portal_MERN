import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
const redirectUrl = "/log-in";

function ProtectedRoute({ children }) {
  const [shouldRedirect, setShouldRedirect] = useState(true);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setShouldRedirect(!auth.isAuth);
  }, [auth]);
  return shouldRedirect ? (
    <Navigate to={redirectUrl} replace />
  ) : children ? (
    children
  ) : (
    <Outlet />
  );
}

export default ProtectedRoute;
