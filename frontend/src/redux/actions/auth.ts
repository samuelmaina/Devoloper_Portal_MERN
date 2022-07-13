import axios from "axios";

import { GET_SUCCESS_MESSAGES } from "./types";

import { attachToken, removeToken, setServerError, setError } from "../utils";
import { Dispatch } from "redux";
export const registerUser = (data: any) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/sign-up/user",
      data
    );
    if (res) {
      dispatch({
        type: GET_SUCCESS_MESSAGES,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch(setServerError(err));
  }
};

export const verifyEmail = (token: string) => async (dispatch: Dispatch) => {
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

export const loginUser = (data: any) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post("/api/auth/log-in/user", data);
    const { token } = res.data;
    attachToken(token);
  } catch (err) {
    dispatch(setServerError(err));
  }
};

export const logoutUser = () => (dispatch: Dispatch) => {
  try {
    removeToken();
  } catch (err) {
    dispatch(setError(err));
  }
};
