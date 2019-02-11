import mapReducer from "../mapReducer";
import {
  SET_STOP_MARKERS,
  STOP_SELECTED,
  SET_STOP_ROUTES
} from "../../actions/actionTypes";

describe("mapReducer()", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      viewableStops: [],
      selectedStopId: null,
      stopRouteDetails: []
    };
  });

  const dummyData = [
    {
      id: "490013836F",
      naptanId: "490013836F",
      lat: 51.559144,
      lon: -0.121661,
      commonName: "Tufnell Park Road"
    },
    {
      id: "490014778Q",
      naptanId: "490014778Q",
      lat: 51.559976,
      lon: -0.122464,
      commonName: "Manor Gardens"
    }
  ];

  describe("Called with action type 'SET_STOP_MARKERS'", () => {
    let newState;

    const action = {
      type: SET_STOP_MARKERS,
      payload: {
        data: dummyData
      }
    };

    beforeEach(() => {
      newState = mapReducer(initialState, action);
    });

    it("should not mutate the previous state", () => {
      expect(newState).not.toBe(initialState);
    });

    it("should create new state in correct format", () => {
      let nextState = {
        selectedStopId: null,
        stopRouteDetails: [],
        viewableStops: ["490013836F", "490014778Q"]
      };

      expect(newState).toMatchObject(nextState);
    });
  });

  describe("Called with action type 'STOP_SELECTED'", () => {
    let newState;

    const action = {
      type: STOP_SELECTED,
      payload: {
        data: "490013836F"
      }
    };

    beforeEach(() => {
      newState = mapReducer(initialState, action);
    });

    it("should not mutate the previous state", () => {
      expect(newState).not.toBe(initialState);
    });

    it("should create new state in correct format", () => {
      expect(newState).toHaveProperty("selectedStopId", "490013836F");
    });
  });

  describe("Called with action type 'SET_STOP_ROUTES'", () => {
    let newState;

    // TODO
  });
});
