import React from "react";

import { Main, NavBar } from "./components";

import { Provider } from "react-redux";

import { Router } from "react-router-dom";

import store from "./redux/store";

import "./App.css";
import { authenticate } from "./redux/utils";

authenticate();

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Main />
    </Provider>
  );
}

export default App;
