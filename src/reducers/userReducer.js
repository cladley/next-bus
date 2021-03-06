import * as actionTypes from "../actions/actionTypes";
import { cloneDeep, remove, find, omit } from "lodash";

const initialState = {
  routes: {
    // This is the stop Id
    byNaptanId: {},
    allIds: []
  },
  predictions: {}
};

// TODO: Refactor and make nicer
const addRoute = (currentRoutes, data) => {
  const { naptanId, route, stopName } = data;
  const copyOfCurrentRoutes = cloneDeep(currentRoutes);
  const idsSet = new Set(copyOfCurrentRoutes.allIds);

  idsSet.add(naptanId);
  copyOfCurrentRoutes.allIds = [...idsSet];
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

  if (copyOfCurrentRoutes.byNaptanId[naptanId].routes.length === 0) {
    delete copyOfCurrentRoutes.byNaptanId[naptanId];
    copyOfCurrentRoutes.allIds = remove(
      copyOfCurrentRoutes.allIds,
      r => r !== naptanId
    );
  }

  return copyOfCurrentRoutes;
};

const extractPredictionDataForRoute = (userRoutes, data) => {
  let userPredictions = {};
  if (data.length > 0) {
    Object.keys(userRoutes).forEach(stopId => {
      const routes = userRoutes[stopId].routes;
      const predictionsForStop = find(data, stop => stop.naptanId === stopId);
      userPredictions[stopId] = [];

      routes.forEach(route => {
        userPredictions[stopId].push({
          line: route.line,
          departures: predictionsForStop.predictions.filter(
            pred => pred.lineId === route.line
          )
        });
      });
    });
  }

  return userPredictions;
};

const removeRouteFromPredictions = (predictions, { naptanId, route }) => {
  let activePredictionsForStop;
  const busStop = predictions[naptanId];

  if (busStop) {
    activePredictionsForStop = busStop.filter(prediction => {
      return prediction.line !== route.line;
    });
  }

  if (activePredictionsForStop.length > 0) {
    return { ...predictions, [naptanId]: activePredictionsForStop };
  } else {
    return omit(predictions, [naptanId]);
  }
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
        routes: removeRoute(state.routes, action.payload.data),
        predictions: removeRouteFromPredictions(
          state.predictions,
          action.payload.data
        )
      };
    case actionTypes.SET_PREDICTIONS_FOR_STOP:
      return {
        ...state,
        predictions: extractPredictionDataForRoute(
          state.routes.byNaptanId,
          action.payload.data
        )
      };
    default:
      return state;
  }
}
