import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoute: null,
  routeStops: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SELECT_ROUTE:
      return { ...state, selectedRoute: action.payload.data };
    case actionTypes.CLEAR_ROUTE:
      return { ...state, selectedRoute: null, routeStops: null };
    case actionTypes.SET_STOPS_FOR_LINE:
      return { ...state, routeStops: action.payload.data.stations };
    default:
      return state;
  }
}
