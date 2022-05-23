import { combineReducers } from "redux";

import auth from "./auth";
import error from "./error";

export default combineReducers({
  auth,
  errors: error,
});
