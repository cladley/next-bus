import React, { Component } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import { isEqual } from "lodash";

import BusStopMapMarker from "../BusStopMapMarker";
import { appearances } from "../Panel";
import UserGeoPoint from "../UserGeoPoint";
import {
  fetchStopsByLocation,
  fetchRouteDetailsByStop,
  setStopSelected,
  setPanelState
} from "../../actions";
import getKeys from "../../keys";

const GOOGLE_MAP_API_KEY = getKeys().GOOGLE_MAP_API_KEY;
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

  componentDidUpdate(prevProps) {
    if (this.props.userLocation) {
      if (!isEqual(prevProps.userLocation, this.props.userLocation)) {
        const {
          userLocation: { lat },
          userLocation: { lng }
        } = this.props;
        const center = new this.mapsApi.LatLng(lat, lng);
        this.map.panTo(center);
      }
    }

    if (this.props.panelState !== prevProps.panelState) {
      if (
        prevProps.panelState === appearances.short &&
        this.props.panelState === appearances.half
      ) {
        const s = this.props.viewableStops[this.props.selectedStopId];
        this.moveMapCenterToOffsetStopLocation(s.lat, s.lon);
      }
    }
  }

  moveMapCenterToOffsetStopLocation(lat, lon) {
    const latLng = new this.mapsApi.LatLng(lat, lon);
    this.offsetCenter(latLng, 0, 190);
  }

  onBoundsChange = ({ center }) => {
    if (!this.mapsApi) return;
    this.initialiseMarkersForCurrentLocation(center);
  };

  initialiseMarkersForCurrentLocation(center) {
    let radius = this.getRadiusInMetres();
    radius = radius || 300;

    if (this.mapsApi && radius) {
      if (this.mapZone) this.mapZone.setMap(null);

      // this.mapZone = new this.mapsApi.Circle({
      //   strokeColor: "#FF0000",
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: "#FF0000",
      //   fillOpacity: 0.1,
      //   map: this.map,
      //   center: center,
      //   radius: Math.floor(radius * 0.6)
      // });
    }

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
          stopLetter={marker.stopLetter}
          index={index}
          isSelected={marker.id === this.props.selectedStopId ? true : false}
          onSelected={stopId =>
            this.handleOnSelected(stopId, marker.lat, marker.lon)
          }
        />
      );
    });
  }

  //   How to offset the center point in Google maps api V3
  offsetCenter(latlng, offsetx, offsety) {
    // latlng is the apparent centre-point
    // offsetx is the distance you want that point to move to the right, in pixels
    // offsety is the distance you want that point to move upwards, in pixels
    // offset can be negative
    // offsetx and offsety are both optional

    var scale = Math.pow(2, this.map.getZoom());

    var worldCoordinateCenter = this.map
      .getProjection()
      .fromLatLngToPoint(latlng);
    var pixelOffset = new this.mapsApi.Point(
      offsetx / scale || 0,
      offsety / scale || 0
    );

    var worldCoordinateNewCenter = new this.mapsApi.Point(
      worldCoordinateCenter.x - pixelOffset.x,
      worldCoordinateCenter.y + pixelOffset.y
    );

    var newCenter = this.map
      .getProjection()
      .fromPointToLatLng(worldCoordinateNewCenter);

    this.map.setCenter(newCenter);
  }

  handleOnSelected = (stopId, lat, lon) => {
    if (stopId) {
      this.props.dispatch(fetchRouteDetailsByStop(stopId));
      this.props.dispatch(setStopSelected(stopId));
      this.props.dispatch(setPanelState(appearances.short));
    }
  };

  render() {
    const { userLocation } = this.props;

    const options = {
      zoomControl: false,
      fullscreenControl: false
    };

    const StopMarkers = this.createMarkers();

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
          options={options}
          defaultZoom={this.props.zoom}
          center={this.props.center}
          onChange={this.onBoundsChange}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={this.handleApiLoaded}
        >
          {StopMarkers}
          {userLocation ? (
            <UserGeoPoint lat={userLocation.lat} lng={userLocation.lng} />
          ) : null}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = ({ map }) => {
  return {
    viewableStops: map.viewableStops,
    stopMarkers: Object.values(map.viewableStops),
    selectedStopId: map.selectedStopId,
    userGeoLocation: map.geoLocation,
    panelState: map.panelState
  };
};

export default connect(mapStateToProps)(Map);
