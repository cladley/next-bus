import React, { Component } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import BusStopMapMarker from "../BusStopMapMarker";
import { fetchStopsByLocation, setStopSelected } from "../../actions";

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 51.560913,
      lng: -0.120881
    },
    zoom: 16
  };

  componentDidMount() {
    this.props.dispatch(fetchStopsByLocation(51.560913, -0.120881));
  }

  render() {
    var onClick = ({ x, y, lat, lng, event }) => {
      console.log(lat, lng);
    };

    var handleOnSelected = stopId => {
      if (stopId) {
        this.props.dispatch(setStopSelected(stopId));
      }
    };

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={onClick}
        >
          {this.props.stopMarkers.map(marker => {
            return (
              <BusStopMapMarker
                key={marker.id}
                lat={marker.lat}
                lng={marker.lon}
                id={marker.id}
                onSelected={handleOnSelected}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

const getStopsAsArray = ({ stops }) => {
  return Object.entries(stops.byId).map(s => s[1]);
};

const mapStateToProps = ({ map }) => {
  return {
    stopMarkers: getStopsAsArray(map)
  };
};

export default connect(mapStateToProps)(Map);
