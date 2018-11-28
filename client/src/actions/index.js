import * as actionTypes from "./actionTypes";
import { getStopsByLatLonUrl } from "../tfl-api";

const fetchStopsByLocation = (lat, lon) => {
  return {
    type: actionTypes.API,
    payload: {
      url: getStopsByLatLonUrl(lat, lon),
      onSuccess: setStopMarkers
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

export { fetchStopsByLocation, setStopMarkers };
