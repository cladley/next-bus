import React, { Component } from "react";
import { connect } from "react-redux";
import { Transition, animated, Trail } from "react-spring";
import GoogleMapReact from "google-map-react";
import BusStopMapMarker from "../BusStopMapMarker";
import { appearances } from "../Panel";
import {
  fetchStopsByLocation,
  fetchRouteDetailsByStop,
  setStopSelected,
  setPanelState,
  clearStopMarkers
} from "../../actions";

import { dot } from "./map.module.css";

const CenterDot = () => {
  return <div className={dot} />;
};

class Map extends Component {
  state = {
    center: {
      lat: 51.560913,
      lng: -0.120881
    },
    dotCenter: {
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

  constructor(props) {
    super(props);
    this.mapsApi = null;
    this.map = null;
  }

  onBoundsChange = center => {
    if (!this.mapsApi) return;
    this.initialiseMarkersForCurrentLocation(center);
  };

  initialiseMarkersForCurrentLocation(center) {
    let radius = this.getRadiusInMetres();
    radius = radius || 300;

    if (this.mapsApi && radius) {
      if (this.mapZone) this.mapZone.setMap(null);

      this.mapZone = new this.mapsApi.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.1,
        map: this.map,
        center: center,
        radius: Math.floor(radius * 0.7)
      });
    }

    this.props.dispatch(clearStopMarkers());
    this.props.dispatch(
      fetchStopsByLocation(center.lat, center.lng, Math.floor(radius * 0.7))
    );
  }

  getRadiusInMetres() {
    if (!this.map) return;

    // r = radius of the earth in statute km
    const r = 6377.83;
    const bounds = this.map.getBounds();
    const center = bounds.getCenter();
    const ne = bounds.getNorthEast();

    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    const lat1 = center.lat() / 57.2958;
    const lon1 = center.lng() / 57.2958;
    const lat2 = ne.lat() / 57.2958;
    const lon2 = ne.lng() / 57.2958;

    // distance = circle radius from center to Northeast corner of bounds
    const dis =
      r *
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
      );

    return dis * 1000;
  }

  handleApiLoaded = ({ map, maps }) => {
    this.mapsApi = maps;
    this.map = map;
    this.initialiseMarkersForCurrentLocation(this.props.center);
  };

  createMarkers() {
    return this.props.stopMarkers.map((marker, index) => {
      return (
        <BusStopMapMarker
          key={marker.id}
          lat={marker.lat}
          lng={marker.lon}
          id={marker.id}
          index={index}
          isSelected={marker.id === this.props.selectedStopId ? true : false}
          onSelected={this.handleOnSelected}
        />
      );
    });
  }

  handleOnSelected = stopId => {
    if (stopId) {
      this.props.dispatch(fetchRouteDetailsByStop(stopId));
      this.props.dispatch(setStopSelected(stopId));
      this.props.dispatch(setPanelState(appearances.half));
    }
  };

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

    const StopMarkers = this.createMarkers();

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD1CH8asyfnJVmRS5B0hB6k1MUqJ_c-He0" }}
          options={options}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          onClick={onClick}
          onBoundsChange={this.onBoundsChange}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.handleApiLoaded}
        >
          {StopMarkers}
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
