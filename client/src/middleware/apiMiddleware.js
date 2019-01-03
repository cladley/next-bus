import { API } from "../actions/actionTypes";

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== API) {
    return;
  }

  const { url, onSuccess, transformResponse } = action.payload;

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch(onSuccess(transformResponse ? transformResponse(data) : data));
    });
};

export default apiMiddleware;
