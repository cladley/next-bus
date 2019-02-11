import { remove } from "lodash";
import {
  LOAD_USER_ROUTES,
  ADD_ROUTE,
  REMOVE_ROUTE
} from "../actions/actionTypes";
import { getLocalStorageValuesByKey } from "../utilities/localStorage";

const localStorageMiddleware = ({ dispatch }) => next => action => {
  if (action.type === LOAD_USER_ROUTES) {
    let userRoutes = getLocalStorageValuesByKey("user_routes");

    action.payload = {
      data: userRoutes
    };

    next(action);
  } else if (action.type === ADD_ROUTE) {
    let { stopName, route, naptanId } = action.payload.data;
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
    const stopRoutes = userRoutes.routes.byNaptanId[naptanId]
      ? userRoutes.routes.byNaptanId[naptanId]
      : { routes: [], stopName: "" };

    stopRoutes.stopName = stopName;
    stopRoutes.routes.push(route);
    userRoutes.routes.byNaptanId[naptanId] = stopRoutes;
    const allIdsSet = new Set(userRoutes.routes.allIds);
    allIdsSet.add(naptanId);
    userRoutes.routes.allIds = [...allIdsSet];

    // save of to localstorage
    localStorage.setItem("user_routes", JSON.stringify(userRoutes));

    next(action);
  } else if (action.type === REMOVE_ROUTE) {
    let { route, naptanId } = action.payload.data;
    let userRoutes = getLocalStorageValuesByKey("user_routes");

    userRoutes.routes.byNaptanId[naptanId].routes = remove(
      userRoutes.routes.byNaptanId[naptanId].routes,
      r => r.line !== route.line
    );

    if (userRoutes.routes.byNaptanId[naptanId].routes.length === 0) {
      delete userRoutes.routes.byNaptanId[naptanId];
      userRoutes.routes.allIds = remove(
        userRoutes.routes.allIds,
        r => r !== naptanId
      );
    }

    localStorage.setItem("user_routes", JSON.stringify(userRoutes));

    next(action);
  } else {
    next(action);
  }
};

export default localStorageMiddleware;
