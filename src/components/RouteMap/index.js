import React from "react";
import GoogleMapReact from "google-map-react";
import styles from "../BusStopMapMarker/bus-stop-map-marker.module.css";
import getKeys from "../keys";
import classNames from "classnames";

const GOOGLE_MAP_API_KEY = getKeys().GOOGLE_MAP_API_KEY;

const SelectedStopMarker = ({ letter }) => {
  return (
    <span className={styles["stop-marker"]}>
      <span className={styles["stop-marker__inner"]}>{letter}</span>
    </span>
  );
};

const MiniMarker = () => {
  return <span className={styles["stop-marker-mini"]} />;
};

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

    this.map.fitBounds(bounds, 0);
  }

  handleApiLoaded = ({ map, maps }) => {
    this.mapsApi = maps;
    this.map = map;

    setImmediate(() => {
      if (this.checkIfShouldRenderPath()) {
        this.renderPath();
      }
    });
  };

  checkIfShouldRenderPath() {
    return this.props.path && this.map && !this.hasPathBeenRendered;
  }

  renderPath() {
    this.renderPathToMap();
    this.hasPathBeenRendered = true;
    this.props.onReady();
  }

  render() {
    const { stops, selectedStop } = this.props;

    if (this.checkIfShouldRenderPath()) {
      this.renderPath();
    }

    const options = {
      zoomControl: false,
      fullscreenControl: false
    };

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
          options={options}
          defaultZoom={this.props.zoom}
          center={this.props.center}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.handleApiLoaded}
        >
          {stops.map(stop => {
            console.log(stop);
            if (stop.stationId === selectedStop.stationNaptanId) {
              return (
                <SelectedStopMarker
                  lat={stop.lat}
                  lng={stop.lon}
                  letter={stop.stopLetter}
                />
              );
            } else {
              return <MiniMarker lat={stop.lat} lng={stop.lon} />;
            }
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default RouteMap;
