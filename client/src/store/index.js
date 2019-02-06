import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import apiMiddleware from "../middleware/apiMiddleware";
import localStorageMiddleware from "../middleware/localStorageMiddleware";
import geoLocationMiddleware from "../middleware/geoLocationMiddleware";
import reducer from "../reducers";

let middleware = [apiMiddleware, localStorageMiddleware, geoLocationMiddleware];

if (process.env.NODE_ENV !== "production") {
  middleware = [
    require("redux-immutable-state-invariant").default(),
    ...middleware
  ];
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
