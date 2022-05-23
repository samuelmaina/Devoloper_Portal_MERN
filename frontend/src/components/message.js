const { message } = require("antd");

export const renderErrorMessage = (error, duration) => {
  return message.error(error, duration);
};
