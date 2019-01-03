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
