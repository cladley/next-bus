import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import apiMiddleware from "../middleware/apiMiddleware";
import localStorageMiddleware from "../middleware/localStorageMiddleware";
import reducer from "../reducers";

const middleware =
  process.env.NODE_ENV !== "production"
    ? [
        require("redux-immutable-state-invariant").default(),
        apiMiddleware,
        localStorageMiddleware
      ]
    : [apiMiddleware, localStorageMiddleware];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
