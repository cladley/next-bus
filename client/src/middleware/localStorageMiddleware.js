import { LOAD_USER_ROUTES } from "../actions/actionTypes";

const localStorageMiddleware = ({ dispatch }) => next => action => {
  if (action.type === LOAD_USER_ROUTES) {
    let userRoutes = localStorage.getItem("asdasd");
    if (userRoutes) {
      userRoutes = JSON.parse(userRoutes);
    }

    action.payload = {
      data: userRoutes
    };

    next(action);
  } else {
    next(action);
  }
};

export default localStorageMiddleware;
