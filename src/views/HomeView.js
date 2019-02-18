import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Layout/Container";
import Button from "../components/Button";
import { ReactComponent as LocationIcon } from "../icons/location.svg";
import SlideTabs from "../components/SlideTabs";

const Msg = ({ closeToast }) => {
  return (
    <div>
      lorem ipsum
      <button onClick={closeToast}>close</button>
    </div>
  );
};

class HomeView extends React.Component {
  state = {
    toggle: false
  };

  render() {
    return (
      <Container>
        <SlideTabs>
          <SlideTabs.Tab title="Tab 1" color="blue">
            This is Slide 1
          </SlideTabs.Tab>
          <SlideTabs.Tab title="Tab 2">This is Slide 2</SlideTabs.Tab>
          <SlideTabs.Tab title="Tab 3">This is Slide 3</SlideTabs.Tab>
        </SlideTabs>
      </Container>
    );
  }
}

export default HomeView;
