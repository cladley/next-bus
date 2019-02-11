import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/Layout/Container";
import Button from "../components/Button";
import { ReactComponent as LocationIcon } from "../icons/location.svg";

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

  showToast() {
    toast(<Msg />);
  }

  render() {
    return (
      <Container>
        <h1 onClick={this.onClick}>nextBus</h1>
        <Link to="/map">Select Bus</Link>
        <br />
        <br />
        <br />

        <Button circular onClick={this.showToast}>
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
