import React, { Component } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import BusStopMapMarker from "../BusStopMapMarker";
import { appearances } from "../Panel";
import {
  fetchStopsByLocation,
  fetchRouteDetailsByStop,
  setStopSelected,
  setPanelState
} from "../../actions";

class Map extends Component {
  state = {
    center: {
      lat: 51.560913,
      lng: -0.120881
    }
  };

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
    const options = {
      zoomControl: false,
      fullscreenControl: false
    };

    var onClick = ({ x, y, lat, lng, event }) => {
      // this.setState({
      //   center: {
      //     lat: lat,
      //     lng: lng
      //   }
      // });
    };

    var handleOnSelected = stopId => {
      if (stopId) {
        this.props.dispatch(fetchRouteDetailsByStop(stopId));
        this.props.dispatch(setStopSelected(stopId));
        this.props.dispatch(setPanelState(appearances.half));
      }
    };

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD1CH8asyfnJVmRS5B0hB6k1MUqJ_c-He0" }}
          options={options}
          defaultCenter={this.props.center}
          center={this.state.center}
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
                isSelected={
                  marker.id === this.props.selectedStopId ? true : false
                }
                onSelected={handleOnSelected}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

const getViewableStopsAsArray = (stops, viewableStops) => {
  return viewableStops.map(naptanId => {
    return stops[naptanId];
  });
};

const mapStateToProps = ({ stops, map }) => {
  return {
    stopMarkers: getViewableStopsAsArray(stops.byNaptanId, map.viewableStops),
    selectedStopId: map.selectedStopId
  };
};

export default connect(mapStateToProps)(Map);
