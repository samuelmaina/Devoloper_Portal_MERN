import { ERASE_MESSAGES } from "../redux/actions/types";
import store from "../redux/store";

const { message } = require("antd");

function clearInfos() {
  store.dispatch({ type: ERASE_MESSAGES });
}

export const renderErrorMessage = (error, duration) => {
  message.error(error, duration);
  clearInfos();
};

export const renderSuccessMessage = (msg, duration) => {
  message.success(msg, duration);
  clearInfos();
};
