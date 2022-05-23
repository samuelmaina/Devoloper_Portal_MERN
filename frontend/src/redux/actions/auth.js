import axios from "axios";

import { GET_ERRORS } from "./types";

export const registerUser = (data, history) => (dispatch) => {
  console.log(data);
  axios
    .post("/api/auth/sign-up/user", data)
    .then((res) => {
      console.log(res);
      return history.push("/log-in");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
