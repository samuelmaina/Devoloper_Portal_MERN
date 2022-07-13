import { combineReducers } from "redux";

import auth from "./auth";
import feedback from "./feedback";
import profile from "./profile";

export default combineReducers({
  auth,
  feedback,
  profile,
});
