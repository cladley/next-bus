import * as actionTypes from "./actionTypes";
import {
  getStopsByLatLonUrl,
  getRouteDetailsForStopUrl,
  getArrivalPredictionForStopUrl,
  getStopsForLineUrl
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

const setPanelState = data => {
  return {
    type: actionTypes.SET_PANEL_STATE,
    payload: {
      data: data
    }
  };
};

const fetchStopsForLine = (line, direction) => {
  return {
    type: actionTypes.API,
    payload: {
      url: getStopsForLineUrl(line, direction),
      onSuccess: setStopsForLine
    }
  };
};

const setStopsForLine = data => {
  return {
    type: actionTypes.SET_STOPS_FOR_LINE,
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

const clearStopSelected = () => {
  return {
    type: actionTypes.CLEAR_STOP_SELECTED
  };
};

const selectRoute = route => {
  return {
    type: actionTypes.SELECT_ROUTE,
    payload: {
      data: route
    }
  };
};

const clearRoute = () => {
  return {
    type: actionTypes.CLEAR_ROUTE
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
  fetchStopsForLine,
  setStopMarkers,
  setStopSelected,
  clearStopSelected,
  setPanelState,
  setStopsForLine,
  fetchRouteDetailsByStop,
  addRoute,
  removeRoute,
  loadUserRoutes,
  selectRoute,
  clearRoute
};
