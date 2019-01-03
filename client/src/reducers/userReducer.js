import * as actionTypes from "../actions/actionTypes";
import { cloneDeep, remove } from "lodash";

const initialState = {
  routes: {
    // This is the stop Id
    byNaptanId: {}
  }
};

// TODO: Refactor and make nicer
const addRoute = (currentRoutes, data) => {
  const { naptanId, route, stopName } = data;
  const copyOfCurrentRoutes = cloneDeep(currentRoutes);

  // If we have a route at the current stop
  if (copyOfCurrentRoutes.byNaptanId[naptanId]) {
    copyOfCurrentRoutes.byNaptanId[naptanId].routes.push(route);
  } else {
    copyOfCurrentRoutes.byNaptanId[naptanId] = {
      stopName: stopName,
      routes: [route]
    };
  }

  return copyOfCurrentRoutes;
};

// TODO: Refactor and make nicer
const removeRoute = (currentRoutes, data) => {
  const { naptanId, route } = data;
  const copyOfCurrentRoutes = cloneDeep(currentRoutes);

  copyOfCurrentRoutes.byNaptanId[naptanId].routes = remove(
    copyOfCurrentRoutes.byNaptanId[naptanId].routes,
    r => r.line !== route.line
  );

  return copyOfCurrentRoutes;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER_ROUTES:
      return action.payload.data ? action.payload.data : initialState;
    case actionTypes.ADD_ROUTE:
      return { ...state, routes: addRoute(state.routes, action.payload.data) };
    case actionTypes.REMOVE_ROUTE:
      return {
        ...state,
        routes: removeRoute(state.routes, action.payload.data)
      };
    case actionTypes.SET_PREDICTIONS_FOR_STOP:
      console.log(action.payload.data);
      return state;
    default:
      return state;
  }
}
