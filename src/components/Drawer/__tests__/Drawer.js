import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Drawer from "../index";

Enzyme.configure({ adapter: new Adapter() });

describe("<Drawer/>", () => {
  it("should be closed when isOpen prop is false", () => {
    const wrapper = shallow(<Drawer isOpen={false} />);
    const drawerDiv = wrapper.find(".drawer");
    expect(drawerDiv.hasClass("active")).toBe(false);
  });

  it("should be open when isOpen prop is true", () => {
    const wrapper = shallow(<Drawer isOpen={true} />);
    const drawerDiv = wrapper.find(".drawer");
    expect(drawerDiv.hasClass("active")).toBe(true);
  });

  it("should not display a backdrop when hasBackdrop is false", () => {
    const wrapper = shallow(<Drawer hasBackdrop={false} />);
    const backdropDiv = wrapper.find(".backdrop");
    expect(backdropDiv.length).toBe(0);
  });

  it("should display a backdrop when hasBackdrop is true", () => {
    const wrapper = shallow(<Drawer hasBackdrop={true} />);
    const backdropDiv = wrapper.find(".backdrop");
    expect(backdropDiv.length).toBe(1);
  });

  describe("when user clicks the backdrop when prop closeOnBackdropClick is true", () => {
    it("should call the closeDrawer() prop", () => {
      const closeDrawerCallback = jest.fn();
      const wrapper = shallow(
        <Drawer
          isOpen={true}
          closeDrawer={closeDrawerCallback}
          closeOnBackdropClick={true}
          hasBackdrop={true}
        />
      );

      const backdropDiv = wrapper.find(".backdrop");
      backdropDiv.simulate("click");
      expect(closeDrawerCallback.mock.calls.length).toBe(1);
    });
  });

  describe("when user clicks the backdrop when prop closeOnBackdropClick is false", () => {
    it("should not call the closeDrawer() prop", () => {
      const closeDrawerCallback = jest.fn();
      const wrapper = shallow(
        <Drawer
          isOpen={true}
          closeDrawer={closeDrawerCallback}
          closeOnBackdropClick={false}
          hasBackdrop={true}
        />
      );

      const backdropDiv = wrapper.find(".backdrop");
      backdropDiv.simulate("click");
      expect(closeDrawerCallback.mock.calls.length).toBe(0);
    });
  });

  describe("when user taps the drawer handle", () => {
    let wrapper;
    let handleDiv;
    let drawerDomDiv;

    beforeEach(() => {
      wrapper = mount(<Drawer isOpen={true} />);
      handleDiv = wrapper.find(".handle");
      drawerDomDiv = wrapper.find(".drawer").getDOMNode();
      handleDiv.simulate("touchstart", createTouchEventObject({ x: 0, y: 0 }));
    });

    it("should set isDragging property to true", () => {
      expect(wrapper.instance().isDragging).toBe(true);
    });

    describe("and drags", () => {
      beforeEach(() => {
        handleDiv.simulate(
          "touchmove",
          createTouchEventObject({ x: 0, y: 100 })
        );
      });
      it("should transform the drawer div element", () => {
        const transform = getComputedStyle(drawerDomDiv).getPropertyValue(
          "transform"
        );

        expect(transform).toEqual("translate3d(0, 100px, 0)");
      });

      describe("and releases", () => {
        beforeEach(() => {
          handleDiv.simulate("touchend", {});
        });

        it("should stop dragging", () => {
          expect(wrapper.instance().isDragging).toBe(false);
        });

        it("should animation back into position", done => {
          setTimeout(() => {
            const transform = getComputedStyle(drawerDomDiv).getPropertyValue(
              "transform"
            );
            expect(transform).toEqual("translate3d(0, 0px, 0)");
            done();
          }, 400);
        });
      });
    });
  });
});

function createClientXY(x, y) {
  return { clientX: x, clientY: y };
}

export function createTouchEventObject({ x = 0, y = 0 }) {
  return { targetTouches: [createClientXY(x, y)] };
}
