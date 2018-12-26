import * as actionTypes from "../actions/actionTypes";

const initialState = {
  routes: {
    // This is the stop Id
    byNaptanId: {},
    allIds: []
  }
};

const addRoute = (currentRoutes, data) => {
  const { naptanId, route, stopName } = data;
  // this is just for testing
  const routesObject = {
    byNaptanId: {
      [naptanId]: {
        stopName: stopName,
        route: [route]
      }
    }
  };
  return routesObject;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER_ROUTES:
      return action.payload.data ? action.payload.data : initialState;
    case actionTypes.ADD_ROUTE:
      return { ...state, routes: addRoute(state.routes, action.payload.data) };
    default:
      return state;
  }
}
