import * as actionTypes from "../actions/actionTypes";

const initialState = {
  routes: {
    // This is the stop Id
    byNaptanId: {},
    allIds: []
  }
};

// Normalize the stop data herer.
const createRoutesObject = data => {
  const routesObject = {
    byNaptanId: {},
    allIds: []
  };
  data.forEach(route => {
    routesObject.byNaptanId[route.id] = route;
    routesObject.allIds.push(route.id);
  });
  return {};
  // return routesObject;
};

const addRoute = (currentRoutes, data) => {
  const { naptanId, route } = data;
  // this is just for testing
  const routesObject = {
    byNaptanId: {
      [naptanId]: [route]
    }
  };
  return routesObject;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER_ROUTES:
      // return {...state, createRoutesObject(action.payload.data)}
      return state;
    case actionTypes.ADD_ROUTE:
      console.log("HERER");
      return { ...state, routes: addRoute(state.routes, action.payload.data) };
    default:
      return state;
  }
}
