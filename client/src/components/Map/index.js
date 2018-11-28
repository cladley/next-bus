import React, { Component } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import BusStopMapMarker from "../BusStopMapMarker";
import { fetchStopsByLocation } from "../../actions";

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 51.560913,
      lng: -0.120881
    },
    zoom: 12
  };

  componentDidMount() {
    this.props.dispatch(fetchStopsByLocation(51.560913, -0.120881));
  }

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
          {this.props.stopMarkers.map(marker => {
            console.log(marker);
            return <BusStopMapMarker lat={marker.lat} lng={marker.lon} />;
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = ({ map }) => {
  return {
    stopMarkers: map.stopMarkers
  };
};

export default connect(mapStateToProps)(Map);
