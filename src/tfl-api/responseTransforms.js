export const stopsByLocationTransform = data => {
  return data.stopPoints.map(stop => {
    return {
      id: stop.id,
      naptanId: stop.naptanId,
      stationNaptanId: stop.stationNaptan,
      lat: stop.lat,
      lon: stop.lon,
      commonName: stop.commonName,
      stopLetter: stop.stopLetter
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
