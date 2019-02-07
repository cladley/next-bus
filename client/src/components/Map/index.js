import React, { Component } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";

import BusStopMapMarker from "../BusStopMapMarker";
import { appearances } from "../Panel";
import UserGeoPoint from "../UserGeoPoint";
import {
  fetchStopsByLocation,
  fetchRouteDetailsByStop,
  setStopSelected,
  setPanelState,
  clearStopMarkers
} from "../../actions";

const EARTH_RADIUS_IN_KM = 6377.83;

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
        radius: Math.floor(radius * 0.6)
      });
    }

    this.props.dispatch(clearStopMarkers());
    this.props.dispatch(
      fetchStopsByLocation(center.lat, center.lng, Math.floor(radius * 0.6))
    );
  }

  getRadiusInMetres() {
    if (!this.map) return;

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
      EARTH_RADIUS_IN_KM *
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
    const { userGeoLocation } = this.props;

    const options = {
      zoomControl: false,
      fullscreenControl: false
    };

    const StopMarkers = this.createMarkers();

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD1CH8asyfnJVmRS5B0hB6k1MUqJ_c-He0" }}
          options={options}
          defaultZoom={this.props.zoom}
          center={this.props.center}
          onBoundsChange={this.onBoundsChange}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.handleApiLoaded}
        >
          {StopMarkers}

          {userGeoLocation ? (
            <UserGeoPoint lat={userGeoLocation.lat} lng={userGeoLocation.lng} />
          ) : null}
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
    selectedStopId: map.selectedStopId,
    userGeoLocation: map.geoLocation
  };
};

export default connect(mapStateToProps)(Map);
