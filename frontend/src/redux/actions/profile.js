import axios from "axios";

import { GET_PROFILE, PROFILE_LOADING } from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get("api/profile");
    if (res) {
      dispatchProfile(res.data);
    }
  } catch (error) {
    //render that we don't have profile regardless of
    //the error.
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
