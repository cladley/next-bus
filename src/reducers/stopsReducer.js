import * as actionTypes from "../actions/actionTypes";

const initialState = {
  byNaptanId: {},
  allIds: []
};

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

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STOP_MARKERS:
      return createStopsObject(action.payload.data);
    default:
      return state;
  }
}
