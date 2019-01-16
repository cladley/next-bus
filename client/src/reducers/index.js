import { combineReducers } from "redux";
import map from "./mapReducer";
import user from "./userReducer";
import stops from "./stopsReducer";
import route from "./routeReducer";

export default combineReducers({
  stops,
  map,
  user,
  route
});
