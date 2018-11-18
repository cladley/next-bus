import { STOPS_BY_LAT_LON } from "./urls";
import { appId, appKey } from "../config";

export const getStopsByLatLonUrl = (lat, lon, radius = 300) => {
  return STOPS_BY_LAT_LON.replace("{{APP_ID}}", appId)
    .replace("{{APP_KEY}}", appKey)
    .replace("{{LAT}}", lat)
    .replace("{{LON}}", lon)
    .replace("{{RADIUS}}", radius);
};

export const getStopByLatLon = async (lat, lon, radius = 300) => {
  try {
    const response = await fetch(getStopsByLatLonUrl(lat, lon, radius));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching stops: {error}`);
  }
};
