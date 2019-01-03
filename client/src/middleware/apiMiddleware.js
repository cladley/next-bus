import { API } from "../actions/actionTypes";

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== API) {
    return;
  }

  const { url, onSuccess, transformResponse } = action.payload;

  if (url instanceof Array) {
    Promise.all(url.map(u => fetch(u)))
      .then(responseArray => {
        return Promise.all(responseArray.map(response => response.json()));
      })
      .then(dataArray => {
        const data = transformResponse
          ? dataArray.map(transformResponse)
          : dataArray;
        dispatch(onSuccess(data));
      });
  } else {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(onSuccess(transformResponse ? transformResponse(data) : data));
      });
  }
};

export default apiMiddleware;
