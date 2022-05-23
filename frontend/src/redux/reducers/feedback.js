import {
  GET_ERRORS,
  GET_SUCCESS_MESSAGES,
  ERASE_INFOS,
} from "../actions/types";
const intialState = {};

function dispatcher(state = intialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case GET_SUCCESS_MESSAGES:
      return action.payload;
    case ERASE_INFOS:
      state = {};
      return {};
    default:
      return state;
  }
}

export default dispatcher;
