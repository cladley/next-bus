import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BusStopRoutes from "../index";

Enzyme.configure({ adapter: new Adapter() });

const setup = props => {
  const wrapper = shallow(<BusStopRoutes {...props} />);
  return wrapper;
};

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
    wrapper = setup({ routes: dummyRoutes });
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

  it("should not render quick route panel if isQuickRoute property is false", () => {
    wrapper = mount(<BusStopRoutes routes={dummyRoutes} />);
    const quickView = wrapper.find(".quick-routes");
    console.log(wrapper.debug());
    expect(quickView.length).toBe(0);
  });

  it("should render quick route panel if isQuickRoute property is true", () => {
    wrapper = setup({ routes: dummyRoutes, isQuickView: true });
    const quickView = wrapper.find(".quick-routes");
    expect(quickView.text()).toEqual("Serves: 17, n17, n41");
  });
});
