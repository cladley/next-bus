import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Layout/Container";
import Button from "../components/Button";
import { ReactComponent as LocationIcon } from "../icons/location.svg";

class HomeView extends React.Component {
  state = {
    toggle: false
  };

  render() {
    return (
      <Container>
        <h1 onClick={this.onClick}>nextBus</h1>
        <Link to="/map">Select Bus</Link>
        <br />
        <br />
        <br />
        <Button circular>
          <LocationIcon />
        </Button>

        <br />
        <br />
        <br />
        <Button>aslsda</Button>
      </Container>
    );
  }
}

export default HomeView;
