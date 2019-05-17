import React from "react";
import Container from "../components/Layout/Container";
import { ReactComponent as LocationIcon } from "../icons/location.svg";
import RouteStops from "../components/RouteStops";

import DragGesture from "../components/DragGesture";

class HomeView extends React.Component {
  state = {
    toggle: false
  };

  render() {
    const styles = {
      height: "100vh",
      width: "100vw",
      border: "1px solid black"
    };

    return <Container />;
  }
}

export default HomeView;
