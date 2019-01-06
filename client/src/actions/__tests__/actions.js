import { fetchStopsByLocation, setStopMarkers } from "../index";
import * as actionTypes from "../actionTypes";
import { stopsByLocationTransform } from "../../tfl-api/responseTransforms";

describe("Action creators", () => {
  describe("fetchStopsByLocation()", () => {
    it("should return object in correct format", () => {
      const coordinates = {
        lat: 42.424,
        lon: -0.23443
      };

      const expectedObject = {
        type: actionTypes.API,
        payload: {
          url: `https://api.tfl.gov.uk/Stoppoint?app_id=6434337f&app_key=ddf7e98f6e48334e7efd30c2cbd9c483&lat=${
            coordinates.lat
          }&lon=${
            coordinates.lon
          }&stoptypes=NaptanPublicBusCoachTram&radius=300`,
          transformResponse: stopsByLocationTransform,
          onSuccess: setStopMarkers
        }
      };

      expect(fetchStopsByLocation(coordinates.lat, coordinates.lon)).toEqual(
        expectedObject
      );
    });
  });

  describe("setStopMarkers()", () => {
    it("should return object in correct format", () => {
      const data = {
        stopPoints: {}
      };

      const expectedObject = {
        type: actionTypes.SET_STOP_MARKERS,
        payload: {
          data: data
        }
      };

      expect(setStopMarkers(data)).toEqual(expectedObject);
    });
  });
});
