import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Layout/Container";
import { ReactComponent as LocationIcon } from "../icons/location.svg";
import RouteStops from "../components/RouteStops";

import DragGesture from "../components/DragGesture";

class HomeView extends React.Component {
  state = {
    toggle: false
  };

  render() {
    return (
      <Container>
        <Link to="/map">Map</Link>
        <br />
        <Link to="/departures">Departures</Link>
      </Container>
    );
  }
}

export default HomeView;
