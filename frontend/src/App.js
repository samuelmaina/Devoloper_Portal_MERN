import React from "react";

import { Main, NavBar } from "./components";

import { Provider } from "react-redux";

import store from "./redux/store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Main />
    </Provider>
  );
}

export default App;
