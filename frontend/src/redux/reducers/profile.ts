import { GET_PROFILE, PROFILE_LOADING } from "../actions/types";
const initialState = {
  profile: null,
  profiles: null,
  isLoading: false,
};
function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
export default profileReducer;
