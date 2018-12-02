import * as actionTypes from "../actions/actionTypes";

const initialState = {
  stops: {
    byId: {},
    allIds: []
  },
  selectedStopId: null
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

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STOP_MARKERS:
      return { ...state, stops: createStopsObject(action.payload.data) };
    case actionTypes.STOP_SELECTED:
      return { ...state, selectedStopId: action.payload.data };
    default:
      return state;
  }
}
