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
  CreateProfile,
} from "./index";

const guest = [
  { path: "/", key: "home", element: HomePage },
  { path: "/sign-up", key: "signup", element: SignUp },
  { path: "/verify/:token", key: "emailverification", element: EmailVerifier },
  { path: "/log-in", key: "login", element: Login },
  { path: "/reset", key: "reset", element: Reset },
];

const protectedRoutes = [
  { path: "/profile", key: "profile", element: Dashboard },
  { path: "/create-profile", key: "createprofile", element: CreateProfile },
];

function AppRoutes() {
  return (
    <Routes>
      {renderRoutes(guest)}
       {/* @ts-ignore */}
      <Route element={<ProtectedRoute />}>
        {renderRoutes(protectedRoutes)}
      </Route>
    </Routes>
  );
}

function renderRoutes(routes:any) {
  return routes.map((url:any) => (
    <Route
    //@ts-ignore
      exact
      path={url.path}
      key={url.key}
      element={<url.element />}
    ></Route>
  ));
}

export default AppRoutes;
