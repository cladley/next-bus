import React, { Component } from "react";
import BusStopMapMarker from '../BusStopMapMarker';

class BusStopMapMarkerContainer extends Component {
  render() {
    return (
      {this.props.children}
    );

  }
}

export default BusStopMapMarkerContainer;
