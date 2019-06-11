import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedRoute: null,
  routeStops: null,
  routePath: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SELECT_ROUTE:
      return { ...state, selectedRoute: action.payload.data };
    case actionTypes.CLEAR_ROUTE:
      return {
        ...state,
        selectedRoute: null,
        routeStops: null,
        routePath: null
      };
    case actionTypes.SET_STOPS_FOR_LINE:
      return {
        ...state,
        routeStops: action.payload.data.stopPointSequences[0].stopPoint,
        routePath: JSON.parse(action.payload.data.lineStrings)[0]
      };
    default:
      return state;
  }
}
