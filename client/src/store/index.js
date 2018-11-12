import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";

const middleware =
  process.env.NODE_ENV !== "production"
    ? [require("redux-immutable-state-invariant").default()]
    : [];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
