import { TEST_DISPATCH } from "../actions/types";
import { GET_ERRORS } from "../actions/types";
const intialState = {};

function dispatcher(state = intialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

export default dispatcher;
