export const STOPS_BY_LAT_LON =
  "https://api.tfl.gov.uk/Stoppoint?app_id={{APP_ID}}&app_key={{APP_KEY}}&lat={{LAT}}&lon={{LON}}&stoptypes=NaptanPublicBusCoachTram&radius={{RADIUS}}";
export const ARRIVAL_PREDICTIONS_FOR_STOP =
  "https://api.tfl.gov.uk/StopPoint/{{NAPTAN_ID}}/Arrivals?app_id={{APP_ID}}&app_key={{APP_KEY}}";
export const ROUTE_DETAILS_FOR_STOP =
  "https://api.tfl.gov.uk/StopPoint/{{NAPTAN_ID}}/Route?app_id={{APP_ID}}&app_key={{APP_KEY}}";
export const LINE_STOPS =
  "https://api.tfl.gov.uk/line/{{LINE}}/route/sequence/{{DIRECTION}}?app_id={{APP_ID}}&app_key={{APP_KEY}}";
