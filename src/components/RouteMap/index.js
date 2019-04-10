import React from "react";
import GoogleMapReact from "google-map-react";
import styles from "./route-map.module.css";

class RouteMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 51.560913,
      lng: -0.120881
    },
    zoom: 16,
    onReady: () => {}
  };

  constructor(props) {
    super(props);
    this.hasPathBeenRendered = false;
    this.map = null;
    this.mapsApi = null;

    this.state = {
      center: { lat: 51.560913, lng: -0.120881 }
    };
  }

  renderPathToMap() {
    const { path } = this.props;
    const bounds = new this.mapsApi.LatLngBounds();

    const latLngSegments = path.map(segment => {
      return {
        lng: segment[0],
        lat: segment[1]
      };
    });

    const routePolyline = new this.mapsApi.Polyline({
      path: latLngSegments,
      strokeColor: "#000000",
      fillColor: "#000000",
      geodesic: true,
      strokeWeight: 2,
      strokeOpacity: 1.0,
      map: this.map
    });

    routePolyline.getPath().forEach(function(latLng) {
      bounds.extend(latLng);
    });

    this.map.fitBounds(bounds);
  }

  handleApiLoaded = ({ map, maps }) => {
    this.mapsApi = maps;
    this.map = map;
  };

  render() {
    const { path, onReady } = this.props;
    console.log("RouteMap Rendered");

    if (path && this.map && !this.hasPathBeenRendered) {
      this.renderPathToMap();
      this.hasPathBeenRendered = true;
      onReady();
    }

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
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.handleApiLoaded}
        />
      </div>
    );
  }
}

export default RouteMap;
