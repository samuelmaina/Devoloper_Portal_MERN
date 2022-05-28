import React from "react";

import { Routes, Route } from "react-router-dom";

import {
  HomePage,
  SignUp,
  Login,
  Reset,
  EmailVerifier,
  Dashboard,
  ProtectedRoute,
} from "./index";

const guestRoutes = [
  { path: "/", key: "home", element: HomePage },
  { path: "/sign-up", key: "signup", element: SignUp },
  { path: "/verify/:token", key: "emailverification", element: EmailVerifier },
  { path: "/log-in", key: "login", element: Login },
  { path: "/reset", key: "reset", element: Reset },
];

const protectedRoutes = [
  { path: "/profile", key: "profile", element: Dashboard },
];

function AppRoutes() {
  return (
    <Routes>
      {renderRoutes(guestRoutes)}
      <Route element={<ProtectedRoute />}>
        {renderRoutes(protectedRoutes)}
      </Route>
    </Routes>
  );
}

function renderRoutes(routes) {
  return routes.map((url) => (
    <Route
      exact
      path={url.path}
      key={url.key}
      element={<url.element />}
    ></Route>
  ));
}

export default AppRoutes;
