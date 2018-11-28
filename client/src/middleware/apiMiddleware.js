const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  console.log("Hit the api middleware");
  if (action.type !== "API") {
    return;
  }

  const { url, onSuccess } = action.payload;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch(onSuccess(data));
    });
};

export default apiMiddleware;
