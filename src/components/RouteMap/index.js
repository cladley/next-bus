import React from "react";
import GoogleMapReact from "google-map-react";
import styles from "./route-map.module.css";

class RouteMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 51.560913,
      lng: -0.120881
    },
    zoom: 16
  };

  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 51.560913, lng: -0.120881 }
    };
  }

  render() {
    const options = {
      zoomControl: false,
      fullscreenControl: false
    };

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD1CH8asyfnJVmRS5B0hB6k1MUqJ_c-He0" }}
          options={options}
          defaultZoom={this.props.zoom}
          center={this.props.center}
        />
      </div>
    );
  }
}

export default RouteMap;
