import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Drawer from "../index";

Enzyme.configure({ adapter: new Adapter() });

describe("<Drawer/>", () => {
  it("should be closed when isOpen prop is false", () => {
    const wrapper = shallow(<Drawer isOpen={false} />);
    console.log(wrapper.debug());
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
});
