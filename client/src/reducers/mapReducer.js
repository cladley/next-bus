import * as actionTypes from "../actions/actionTypes";

const initialState = {
  viewableStops: [],
  selectedStopId: null,
  stopRouteDetails: []
};

// Normalize the stop data herer.
const createStopsObject = data => {
  console.log(data);
  const stopsObject = {
    byNaptanId: {},
    allIds: []
  };
  data.forEach(stop => {
    stopsObject.byNaptanId[stop.naptanId] = stop;
    stopsObject.allIds.push(stop.naptanId);
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

const createViewableStopsArray = data => {
  return data.map(stop => {
    return stop.naptanId;
  });
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STOP_MARKERS:
      return {
        ...state,
        stops: createStopsObject(action.payload.data),
        viewableStops: createViewableStopsArray(action.payload.data)
      };
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
