export const stopsByLocationTransform = data => {
  return data.stopPoints.map(stop => {
    return {
      id: stop.id,
      naptanId: stop.naptanId,
      lat: stop.lat,
      lon: stop.lon,
      commonName: stop.commonName
    };
  });
};

export const predictionsForStopTransform = data => {
  const naptanId = data[0].naptanId;

  const predictions = data.map(prediction => {
    return {
      destination: prediction.destinationName,
      direction: prediction.direction,
      lineName: prediction.lineName,
      lineId: prediction.lineId,
      stopName: prediction.stationName,
      arrival: prediction.expectedArrival
    };
  });

  return {
    naptanId,
    predictions
  };
};
