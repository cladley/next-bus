import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BusStopRoutes from "../index";

Enzyme.configure({ adapter: new Adapter() });

describe("<BusStopRoutes />", () => {
  let wrapper;
  const dummyRoutes = [
    {
      destination: "London Bridge",
      direction: "outbound",
      line: "17",
      routeSectionName: "Archway Station  / Holloway Road - London Bridge"
    },
    {
      destination: "London Bridge",
      direction: "outbound",
      line: "n17",
      routeSectionName: "Archway Station  / Holloway Road - London Bridge"
    },
    {
      destination: "Trafalgar Square / Charing Cross Stn",
      direction: "inbound",
      line: "n41",
      routeSectionName:
        "Tottenham Hale Bus Station - Trafalgar Square / Charing Cross Stn"
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<BusStopRoutes routes={dummyRoutes} />);
  });

  it("should pass", () => {
    console.log(wrapper.debug());
    expect(true).toBe(true);
  });

  it("instance method getDayBusRoutes() should return correct routes", () => {
    const busStopRoutesInstance = wrapper.instance();
    const dayTimeRoutes = busStopRoutesInstance.getDayBusRoutes(dummyRoutes);
    expect(dayTimeRoutes.length).toBe(1);
    expect(dayTimeRoutes[0].line).toBe("17");
  });

  it("instance method getDayBusRoutes() should return correct routes", () => {
    const busStopRoutesInstance = wrapper.instance();
    const nightTimeRoutes = busStopRoutesInstance.getNightBusRoutes(
      dummyRoutes
    );
    expect(nightTimeRoutes.length).toBe(2);
    expect(nightTimeRoutes[0].line).toBe("n17");
    expect(nightTimeRoutes[1].line).toBe("n41");
  });
});
