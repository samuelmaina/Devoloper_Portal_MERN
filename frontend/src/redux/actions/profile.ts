import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING } from "./types";

import { setError, setServerError } from "../utils";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get("api/profile");
    if (res) {
      dispatchProfile(res.data);
    }
  } catch (err) {
    dispatch(setServerError(err));
    dispatchProfile({});
  }
  function dispatchProfile(profile) {
    return dispatch({
      type: GET_PROFILE,
      payload: profile,
    });
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};
