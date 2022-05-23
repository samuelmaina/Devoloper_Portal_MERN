import axios from "axios";

import { GET_ERRORS, GET_SUCCESS_MESSAGES } from "./types";

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
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
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
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
