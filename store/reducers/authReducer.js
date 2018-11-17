import * as actionTypes from "../actions/types";

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
