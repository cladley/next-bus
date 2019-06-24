function fromLatLngToPoint(latLng, map, google) {
  var topRight = map
    .getProjection()
    .fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map
    .getProjection()
    .fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);

  return new google.Point(
    (worldPoint.x - bottomLeft.x) * scale,
    (worldPoint.y - topRight.y) * scale
  );
}

export default fromLatLngToPoint;

// const geo = {
//   glOffset: Math.pow(2, 28), //268435456,
//   glRadius: Math.pow(2, 28) / Math.PI,
//   a: Math.pow(2, 28),
//   b: 85445659.4471,
//   c: 0.017453292519943,
//   d: 0.0000006705522537,
//   e: Math.E, //2.7182818284590452353602875,
//   p: Math.PI / 180,

//   lonToX: function(lon) {
//     return Math.round(this.glOffset + this.glRadius * lon * this.p);
//   },

//   XtoLon: function(x) {
//     return -180 + this.d * x;
//   },

//   latToY: function(lat) {
//     return Math.round(
//       this.glOffset -
//         (this.glRadius *
//           Math.log(
//             (1 + Math.sin(lat * this.p)) / (1 - Math.sin(lat * this.p))
//           )) /
//           2
//     );
//   },

//   YtoLat: function(y) {
//     return (
//       Math.asin(
//         Math.pow(this.e, (2 * this.a) / this.b - (2 * y) / this.b) /
//           (Math.pow(this.e, (2 * this.a) / this.b - (2 * y) / this.b) + 1) -
//           1 / (Math.pow(this.e, (2 * this.a) / this.b - (2 * y) / this.b) + 1)
//       ) / this.c
//     );
//   },

//   deltaLonPerDeltaX: function(deltaX, zoom) {
//     // 2^(7+zoom) pixels <---> 180 degrees
//     return (deltaX * 180) / Math.pow(2, 7 + zoom);
//   },

//   deltaLatPerDeltaY: function(deltaY, zoom, startLat) {
//     // more complex because of the curvature, we calculte it by difference
//     var startY = this.latToY(startLat),
//       endY = startY + deltaY * Math.pow(2, 28 - 7 - zoom),
//       endLat = this.YtoLat(endY);

//     return endLat - startLat; // = deltaLat
//   }
// };

// export default geo;
