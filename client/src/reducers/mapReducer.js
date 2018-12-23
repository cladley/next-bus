import * as actionTypes from "../actions/actionTypes";

const initialState = {
  stops: {
    byId: {},
    allIds: []
  },
  selectedStopId: null,
  stopRouteDetails: []
};

// Normalize the stop data herer.
const createStopsObject = data => {
  const stopsObject = {
    byId: {},
    allIds: []
  };
  data.forEach(stop => {
    stopsObject.byId[stop.id] = stop;
    stopsObject.allIds.push(stop.id);
  });
  return stopsObject;
};

const cleanUpStopRouteDetails = data => {
  return data.map(route => {
    return {
      destination: route.destinationName,
      direction: route.direction,
      line: route.lineId,
      routeSectionName: route.routeSectionName
    };
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STOP_MARKERS:
      return { ...state, stops: createStopsObject(action.payload.data) };
    case actionTypes.STOP_SELECTED:
      return { ...state, selectedStopId: action.payload.data };
    case actionTypes.SET_STOP_ROUTES:
      return {
        ...state,
        stopRouteDetails: cleanUpStopRouteDetails(action.payload.data)
      };
    default:
      return state;
  }
}
