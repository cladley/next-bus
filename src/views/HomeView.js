import React from "react";
import Container from "../components/Layout/Container";
import { ReactComponent as LocationIcon } from "../icons/location.svg";
import RouteStops from "../components/RouteStops";

class HomeView extends React.Component {
  state = {
    toggle: false
  };

  render() {
    return (
      <Container>
        <RouteStops />
      </Container>
    );
  }
}

export default HomeView;
