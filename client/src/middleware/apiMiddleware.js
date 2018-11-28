const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== "API") {
    return;
  }

  const { url, onSuccess } = action.payload;
  fetch(url).then(data => {
    dispatch(onSuccess(data));
  });
};

export default apiMiddleware;
