import * as actionTypes from "../actions/actionTypes";

const initialState = {
  stopMarkers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STOP_MARKERS:
      return { ...state, stopMarkers: action.payload.data };
    default:
      return state;
  }
}
