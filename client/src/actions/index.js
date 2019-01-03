import * as actionTypes from "./actionTypes";
import {
  getStopsByLatLonUrl,
  getRouteDetailsForStopUrl,
  getArrivalPredictionForStopUrl
} from "../tfl-api";
import {
  stopsByLocationTransform,
  predictionsForStopTransform
} from "../tfl-api/responseTransforms";

const fetchStopsByLocation = (lat, lon) => {
  return {
    type: actionTypes.API,
    payload: {
      url: getStopsByLatLonUrl(lat, lon),
      onSuccess: setStopMarkers,
      transformResponse: stopsByLocationTransform
    }
  };
};

const fetchRouteDetailsByStop = naptanId => {
  return {
    type: actionTypes.API,
    payload: {
      url: getRouteDetailsForStopUrl(naptanId),
      onSuccess: setStopRoutes
    }
  };
};

const fetchPredictionsForStop = naptanId => {
  return {
    type: actionTypes.API,
    payload: {
      url: getArrivalPredictionForStopUrl(naptanId),
      onSuccess: setPredictionsForStop,
      transformResponse: predictionsForStopTransform
    }
  };
};

const fetchPredictionsForStops = stopIds => {
  return {
    type: actionTypes.API,
    payload: {
      url: stopIds.map(id => getArrivalPredictionForStopUrl(id)),
      onSuccess: setPredictionsForStop,
      transformResponse: predictionsForStopTransform
    }
  };
};

const setPredictionsForStop = data => {
  return {
    type: actionTypes.SET_PREDICTIONS_FOR_STOP,
    payload: {
      data: data
    }
  };
};

const setStopRoutes = data => {
  return {
    type: actionTypes.SET_STOP_ROUTES,
    payload: {
      data: data
    }
  };
};

const setStopMarkers = data => {
  return {
    type: actionTypes.SET_STOP_MARKERS,
    payload: {
      data: data
    }
  };
};

const setStopSelected = stopId => {
  return {
    type: actionTypes.STOP_SELECTED,
    payload: {
      data: stopId
    }
  };
};

const addRoute = (naptanId, route, stopName) => {
  return {
    type: actionTypes.ADD_ROUTE,
    payload: {
      data: {
        naptanId,
        route,
        stopName
      }
    }
  };
};

const removeRoute = (naptanId, route, stopName) => {
  return {
    type: actionTypes.REMOVE_ROUTE,
    payload: {
      data: {
        naptanId,
        route,
        stopName
      }
    }
  };
};

const loadUserRoutes = () => {
  return {
    type: actionTypes.LOAD_USER_ROUTES
  };
};

export {
  fetchPredictionsForStop,
  fetchPredictionsForStops,
  fetchStopsByLocation,
  setStopMarkers,
  setStopSelected,
  fetchRouteDetailsByStop,
  addRoute,
  removeRoute,
  loadUserRoutes
};
