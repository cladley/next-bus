import { GET_GEO_LOCATION } from "../actions/actionTypes";
import { geoLocationSuccess, geoLocationError } from "../actions";

const geoLocationMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== GET_GEO_LOCATION) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      dispatch(geoLocationSuccess(position));
    },
    error => {
      dispatch(geoLocationError(error));
    }
  );
};

export default geoLocationMiddleware;
