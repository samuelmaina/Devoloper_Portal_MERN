import axios from "axios";
import { SET_AUTH, GET_ERRORS } from "./actions/types";

import store from "./store";

function setAuthTokenInHeader(token: string) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function authenticate() {
  //@ts-ignore
  const token: string = localStorage.getItem("jwt-token");
  setAuthTokenInHeader(token);
  store.dispatch({
    type: SET_AUTH,
    payload: token,
  });
}

export function attachToken(token: string) {
  localStorage.setItem("jwt-token", token);
  authenticate();
}
export function removeToken() {
  localStorage.removeItem("jwt-token");
  authenticate();
}

export function setServerError(err: any) {
  return setError(err.response.data.error);
}

export function setError(err: any) {
  return {
    type: GET_ERRORS,
    payload: err,
  };
}
