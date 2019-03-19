import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BusStopMapMarker from "../index";

Enzyme.configure({ adapter: new Adapter() });

const dummyMarker = {
  id: "490008367J",
  naptanId: "490008367J",
  lat: 51.559808,
  lon: -0.11595,
  commonName: "Hornsey Road"
};

const setup = props => {
  return mount(
    <BusStopMapMarker
      lat={dummyMarker.lat}
      lon={dummyMarker.lon}
      id={dummyMarker.id}
      index={0}
      isSelected={false}
      onSelected={() => {}}
      {...props}
    />
  );
};

describe("<BusStopMapMarker />", () => {
  let wrapper;
  let callback;

  beforeEach(() => {
    callback = jest.fn();
    wrapper = setup({onSelected: callback});
  });

  it("should call onSelected callback when clicked", () => {
    const markerElement = wrapper.find('.marker').first();
    markerElement.simulate('click');
    expect(callback.mock.calls.length).toBe(1);
  });

  it('should be call onSelected callback with correct id when clicked', () => {
    const markerElement = wrapper.find('.marker').first();
    markerElement.simulate('click');
    expect(callback.mock.calls[0][0]).toBe(dummyMarker.id);
  });
});
