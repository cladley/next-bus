import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoute: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SELECT_ROUTE:
      return { ...state, selectedRoute: action.payload.data };
    case actionTypes.CLEAR_ROUTE:
      return { ...state, selectedRoute: null };
    default:
      return state;
  }
}
