import * as urls from "./urls";
import { appId, appKey } from "../config";

export const getStopsByLatLonUrl = (lat, lon, radius = 300) => {
  return urls.STOPS_BY_LAT_LON.replace("{{APP_ID}}", appId)
    .replace("{{APP_KEY}}", appKey)
    .replace("{{LAT}}", lat)
    .replace("{{LON}}", lon)
    .replace("{{RADIUS}}", radius);
};

export const getArrivalPredictionForStopUrl = naptanId => {
  return urls.ARRIVAL_PREDICTIONS_FOR_STOP.replace("{{APP_ID}}", appId)
    .replace("{{APP_KEY}}", appKey)
    .replace("{{NAPTAN_ID}}", naptanId);
};

export const getRouteDetailsForStopUrl = naptanId => {
  return urls.ROUTE_DETAILS_FOR_STOP.replace("{{APP_ID}}", appId)
    .replace("{{APP_KEY}}", appKey)
    .replace("{{NAPTAN_ID}}", naptanId);
};

export const getStopByLatLon = async (lat, lon, radius = 300) => {
  try {
    const response = await fetch(getStopsByLatLonUrl(lat, lon, radius));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching stops: ${error}`);
  }
};

export const getArrivalPredictionForStop = async naptanId => {
  try {
    const response = await fetch(getArrivalPredictionForStopUrl(naptanId));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching predictions: ${error}`);
  }
};

export const getRouteDetailsForStop = async naptanId => {
  try {
    const response = await fetch(getRouteDetailsForStopUrl(naptanId));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching route details for stop: ${error}`);
  }
};
