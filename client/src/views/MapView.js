import React, { Component } from "react";
import { connect } from "react-redux";
import Map from "../components/Map";
import StopDetails from "../components/BusStopDetails";

class MapView extends Component {
  render() {
    return (
      <div>
        <Map />
        {this.props.isStopDetailsShowing ? (
          <StopDetails lines={this.props.lines} />
        ) : null}
      </div>
    );
  }
}

const getBusStopLines = ({ stops, selectedStopId }) => {
  if (!selectedStopId || stops.length === 0) return [];

  const selectedStopObject = stops.byId[selectedStopId];
  return selectedStopObject.lines;
};

const mapStateToProps = ({ map }) => {
  return {
    isStopDetailsShowing: !!map.selectedStopId,
    lines: getBusStopLines(map)
  };
};

export default connect(mapStateToProps)(MapView);
