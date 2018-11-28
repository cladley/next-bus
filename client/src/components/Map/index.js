import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import BusStopMapMarker from "../BusStopMapMarker";

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 51.509865,
      lng: -0.118092
    },
    zoom: 12
  };

  render() {
    var onClick = ({ x, y, lat, lng, event }) => {
      console.log(lat, lng);
    };

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={onClick}
        >
          <BusStopMapMarker lat={51.509865} lng={-0.118092} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
