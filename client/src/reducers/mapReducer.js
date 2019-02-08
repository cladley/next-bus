import * as actionTypes from "../actions/actionTypes";
import { appearances } from "../components/Panel";

const initialState = {
  viewableStops: {},
  selectedStopId: null,
  stopRouteDetails: [],
  panelState: appearances.closed,
  geoLocation: null
};

// Normalize the stop data herer.
const createStopsObject = data => {
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

const createViewableStopsMap = (currentStops, data) => {
  const stops = { ...currentStops };
  data.map(stop => {
    return (stops[stop.naptanId] = stop);
  });
  return stops;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STOP_MARKERS:
      return {
        ...state,
        viewableStops: createViewableStopsMap(
          state.viewableStops,
          action.payload.data
        )
      };

    case actionTypes.CLEAR_STOP_MARKERS:
      return {
        ...state,
        viewableStops: []
      };

    case actionTypes.STOP_SELECTED:
      return { ...state, selectedStopId: action.payload.data };

    case actionTypes.CLEAR_STOP_SELECTED:
      return {
        ...state,
        selectedStopId: null,
        stopRouteDetails: []
      };
    case actionTypes.SET_STOP_ROUTES:
      return {
        ...state,
        stopRouteDetails: cleanUpStopRouteDetails(action.payload.data)
      };
    case actionTypes.SET_PANEL_STATE:
      return { ...state, panelState: action.payload.data };
    default:
      return state;
  }
}
