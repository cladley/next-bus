import { LOAD_USER_ROUTES, ADD_ROUTE } from "../actions/actionTypes";
import { getLocalStorageValuesByKey } from "../utilities/localStorage";

const localStorageMiddleware = ({ dispatch }) => next => action => {
  if (action.type === LOAD_USER_ROUTES) {
    let userRoutes = getLocalStorageValuesByKey("user_routes");

    action.payload = {
      data: userRoutes
    };

    next(action);
  } else if (action.type === ADD_ROUTE) {
    let userRoutes = getLocalStorageValuesByKey("user_routes");
    let userRoutesObject = {
      routes: {
        byNaptanId: {},
        allIds: []
      }
    };

    if (!userRoutes) {
      userRoutes = userRoutesObject;
    }
    const stopRoutes = userRoutes.routes.byNaptanId[
      action.payload.data.naptanId
    ]
      ? userRoutes.routes.byNaptanId[action.payload.data.naptanId]
      : [];

    stopRoutes.push(action.payload.data.route);
    userRoutes.routes.byNaptanId[action.payload.data.naptanId] = stopRoutes;

    // save of to localstorage
    localStorage.setItem("user_routes", JSON.stringify(userRoutes));

    next(action);
  } else {
    next(action);
  }
};

export default localStorageMiddleware;
