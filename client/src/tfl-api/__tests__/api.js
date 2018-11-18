import { getStopsByLatLonUrl } from "../index";

describe("Tfl Api - getStopsByLatLonUrl()", () => {
  it("should return the correct url", () => {
    const expectedUrl =
      "https://api.tfl.gov.uk/Stoppoint?app_id=6434337f&app_key=ddf7e98f6e48334e7efd30c2cbd9c483&lat=51.560556&lon=-0.12123&stoptypes=NaptanPublicBusCoachTram&radius=300";
    expect(getStopsByLatLonUrl(51.560556, -0.12123)).toEqual(expectedUrl);
  });
});
