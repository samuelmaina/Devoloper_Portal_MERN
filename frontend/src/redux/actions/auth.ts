import axios from "axios";

import { GET_SUCCESS_MESSAGES } from "./types";

import { attachToken, removeToken, setServerError, setError } from "../utils";
export const registerUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/sign-up/user", data);
    if (res) {
      dispatch({
        type: GET_SUCCESS_MESSAGES,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch(setServerError(err));
  }
};

export const verifyEmail = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/auth/verify/${token}`);
    if (res) {
      dispatch({
        type: GET_SUCCESS_MESSAGES,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch(setServerError(err));
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/log-in/user", data);
    const { token } = res.data;
    attachToken(token);
  } catch (err) {
    dispatch(setServerError(err));
  }
};

export const logoutUser = () => (dispatch) => {
  try {
    removeToken();
  } catch (err) {
    dispatch(setError(err));
  }
};
