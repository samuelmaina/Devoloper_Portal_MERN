import { SET_AUTH } from "../actions/types";

const intialState = {
  isAuth: false,
};

function dispatcher(state = intialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload ? true : false,
      };
    default:
      return state;
  }
}

export default dispatcher;
