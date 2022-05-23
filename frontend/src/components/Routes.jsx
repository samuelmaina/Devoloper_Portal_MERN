import React from "react";

import { Routes, Route } from "react-router-dom";

import { HomePage, SignUp, Login, Reset, EmailVerifier } from "./index";

const urls = [
  { path: "/", element: HomePage },
  { path: "/sign-up", element: SignUp },
  { path: "/verify/:token", element: EmailVerifier },
  { path: "/log-in", element: Login },
  { path: "/reset", element: Reset },
];

function AppRoutes() {
  return (
    <Routes>
      {urls.map((url, index) => (
        <Route
          exact
          path={url.path}
          key={index}
          element={<url.element />}
        ></Route>
      ))}
    </Routes>
  );
}

export default AppRoutes;
