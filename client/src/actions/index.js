import * as actionTypes from "./actionTypes";
import { getStopsByLatLonUrl, getRouteDetailsForStopUrl } from "../tfl-api";

const fetchStopsByLocation = (lat, lon) => {
  return {
    type: actionTypes.API,
    payload: {
      url: getStopsByLatLonUrl(lat, lon),
      onSuccess: setStopMarkers
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
      data: data.stopPoints
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

export {
  fetchStopsByLocation,
  setStopMarkers,
  setStopSelected,
  fetchRouteDetailsByStop
};
