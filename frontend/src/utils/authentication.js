import axios from "axios";
import { SET_AUTH } from "../redux/actions/types";
import store from "../redux/store";

function setAuthTokenInHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authrization"];
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
}
