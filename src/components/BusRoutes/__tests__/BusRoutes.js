import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BusRoutes from "../index";

Enzyme.configure({ adapter: new Adapter() });

const dummyRoutes = [
  {
    destination: "Archway Station",
    direction: "inbound",
    line: "17",
    routeSectionName: "London Bridge - Archway Station"
  },
  {
    destination: "Barnet Hospital",
    direction: "outbound",
    line: "263",
    routeSectionName: "Highbury Barn - Barnet Hospital"
  }
];

const setup = props => {
  const wrapper = shallow(<BusRoutes {...props} />);
  return wrapper;
};

describe("<BusRoutes />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ routes: dummyRoutes });
  });

  it("should display two routes", () => {
    expect(wrapper.find("li").length).toBe(2);
  });

  it("should display the route line", () => {
    const firstRoute = wrapper.find("li").first();
    const line = firstRoute.find(".line");
    expect(line.text()).toEqual(dummyRoutes[0].line);
  });

  it("should display the route destination", () => {
    const firstRoute = wrapper.find("li").first();
    const destination = firstRoute.find(".destination");
    expect(destination.text()).toEqual(dummyRoutes[0].destination);
  });

  describe("User clicks to add route", () => {
    let callback;

    beforeEach(() => {
      callback = jest.fn();
      wrapper = setup({ routes: dummyRoutes, onToggleRoute: callback });
    });

    it("should call onToggleRoute property", () => {
      const firstRoute = wrapper.find("li").first();
      const toggleButton = firstRoute.find(".toggle-route-button");
      toggleButton.simulate("click");
      expect(callback.mock.calls.length).toBe(1);
    });

    it("should call onToggleRoute with route as parameter", () => {
      const firstRoute = wrapper.find("li").first();
      const toggleButton = firstRoute.find(".toggle-route-button");
      toggleButton.simulate("click");
      expect(callback.mock.calls[0][0]).toEqual(dummyRoutes[0]);
    });

    test("toggle button does not have active class when route is not selected", () => {
      const firstRoute = wrapper.find("li").first();
      const toggleButton = firstRoute.find(".toggle-route-button");
      expect(toggleButton.hasClass("is-active")).toBe(false);
    });

    test("toggle button has active class when route is selected", () => {
      const dummyRoute = [dummyRoutes[0]];
      dummyRoute[0].isSelectedByUser = true;
      wrapper = setup({ routes: dummyRoute });
      const firstRoute = wrapper.find("li").first();
      const toggleButton = firstRoute.find(".toggle-route-button");
      expect(toggleButton.hasClass("is-active")).toBe(true);
    });
  });
});
