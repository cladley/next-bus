import React from "react";
import Container from "../components/Layout/Container";
import { ReactComponent as LocationIcon } from "../icons/location.svg";
import SlideTabs from "../components/SlideTabs";

class HomeView extends React.Component {
  state = {
    toggle: false
  };

  render() {
    return (
      <Container>
        <SlideTabs>
          <SlideTabs.Tab title="Tab 1">This is Slide 1</SlideTabs.Tab>
          <SlideTabs.Tab title="Tab 2">This is Slide 2</SlideTabs.Tab>
        </SlideTabs>
      </Container>
    );
  }
}

export default HomeView;
