import stopReducer from "../stopsReducer";
import { SET_STOP_MARKERS } from "../../actions/actionTypes";

describe("stopReducer()", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      byNaptanId: {},
      allIds: []
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
      newState = stopReducer(initialState, action);
    });

    it("should not mutate the previous state", () => {
      expect(newState).not.toBe(initialState);
    });

    it("should create new state in correct format", () => {
      let nextState = {
        byNaptanId: {
          "490013836F": {
            id: "490013836F",
            naptanId: "490013836F",
            lat: 51.559144,
            lon: -0.121661,
            commonName: "Tufnell Park Road"
          },
          "490014778Q": {
            id: "490014778Q",
            naptanId: "490014778Q",
            lat: 51.559976,
            lon: -0.122464,
            commonName: "Manor Gardens"
          }
        },
        allIds: ["490013836F", "490014778Q"]
      };

      expect(newState).toMatchObject(nextState);
    });
  });
});
