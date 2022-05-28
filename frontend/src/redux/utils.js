import axios from "axios";
import { SET_AUTH, GET_ERRORS } from "./actions/types";

import store from "./store";

function setAuthTokenInHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function authenticate() {
  const token = localStorage.getItem("jwt-token");
  setAuthTokenInHeader(token);
  store.dispatch({
    type: SET_AUTH,
    payload: token,
  });
}

export function attachToken(token) {
  localStorage.setItem("jwt-token", token);
  authenticate();
}
export function removeToken() {
  localStorage.removeItem("jwt-token");
  authenticate();
}

export function setServerError(err) {
  return setError(err.response.data);
}

export function setError(err) {
  return {
    type: GET_ERRORS,
    payload: err,
  };
}
