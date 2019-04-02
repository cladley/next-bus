import React from "react";
import { shallow } from "enzyme";
import SlideTabsTrack from "../SlideTabsTrack";

describe("<SlideTabsTrack />", () => {
  let wrapper;
  let onBoundsExceededCallback = jest.fn();

  const props = {
    velocity: { x: 51 },
    deltaX: {
      getValue() {
        return 0;
      }
    },
    down: false,
    onBoundsExceeded: onBoundsExceededCallback,
    ref: {},
    x: {
      interpolate(callback) {
        return callback();
      }
    }
  };

  it("should render without an issue", () => {
    wrapper = shallow(<SlideTabsTrack {...props} />);
    console.log(wrapper.debug());
    expect(wrapper).toBeDefined();
  });

  describe("when velocity is greater than 50", () => {
    let newProps;
    beforeEach(() => {
      wrapper = shallow(<SlideTabsTrack {...props} />);
    });

    it("should call onBoundsExceeded with a direction of 'right'", () => {
      expect(onBoundsExceededCallback).toHaveBeenCalledWith("right");
    });

    it("should call onBoundsExceeded with a direction of 'left' when delta direction is less than 0", () => {
      newProps = {
        ...props,
        deltaX: {
          getValue() {
            return -1;
          }
        }
      };

      wrapper = shallow(<SlideTabsTrack {...newProps} />);
      expect(onBoundsExceededCallback).toHaveBeenCalledWith("left");
    });
  });

  describe("when touch is down and delta is greater than half window width", () => {
    let newProps;

    beforeEach(() => {
      newProps = {
        ...props,
        down: true,
        deltaX: {
          getValue() {
            return window.innerWidth / 2 + 1;
          }
        }
      };

      wrapper = shallow(<SlideTabsTrack {...newProps} />);
    });

    it("should call onBoundsExceeded with a direction of 'right'", () => {
      expect(onBoundsExceededCallback).toHaveBeenCalledWith("right");
    });
  });
});
