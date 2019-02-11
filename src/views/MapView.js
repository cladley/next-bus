import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import classNames from "classnames";

import { clearRoute, setPanelState, clearStopSelected } from "../actions/index";
import Map from "../components/Map";
import Panel, { appearances } from "../components/Panel";
import BusStopRoutesContainer from "../components/BusStopRoutesContainer";
import LineStops from "../components/LineStops";
import GeoLocationButton from "../components/GeoLocationButton";
import styles from "./mapview.module.css";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.toastId = null;
    this.state = {
      center: { lat: 51.560913, lng: -0.120881 },
      userGeoLocation: null
    };
  }

  handleShowRoute = route => {
    console.log(route);
  };

  handlePanelChange = type => {
    if (type === appearances.short) {
      this.props.dispatch(setPanelState(appearances.half));
    } else if (type === appearances.full) {
      this.props.dispatch(setPanelState(appearances.half));
      setTimeout(() => {
        this.props.dispatch(clearRoute());
      }, 500);
    } else if (type === appearances.half) {
      this.props.dispatch(setPanelState(appearances.closed));
      setTimeout(() => {
        this.props.dispatch(clearStopSelected());
      }, 400);
    }
  };

  handleGeoLocationChange = coords => {
    this.setState({
      userGeoLocation: coords
    });
  };

  handleGeoLocationError = error => {
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast(
        "Unable to get user location data. Please enable location services and try again"
      );
    }
  };

  render() {
    const { isStopSelected, selectedRoute, naptanId, panelState } = this.props;

    let MapContainerClassNames = classNames(styles["map-container"], {
      [styles.active]: isStopSelected
    });

    const isQuickView = panelState === appearances.short;

    return (
      <React.Fragment>
        <GeoLocationButton
          onChange={this.handleGeoLocationChange}
          onError={this.handleGeoLocationError}
        />
        <div className={MapContainerClassNames}>
          <Map
            center={this.state.center}
            userLocation={this.state.userGeoLocation}
          />
        </div>
        <Panel isOpen={panelState} onChangeOpen={this.handlePanelChange}>
          <Panel.Half>
            {isStopSelected && (
              <BusStopRoutesContainer
                naptanId={naptanId}
                showRoute={this.handleShowRoute}
                isQuickView={isQuickView}
              />
            )}
          </Panel.Half>
          <Panel.Full>
            {selectedRoute && (
              <LineStops
                line={selectedRoute.line}
                direction={selectedRoute.direction}
              />
            )}
          </Panel.Full>
        </Panel>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ map, route }) => {
  return {
    selectedRoute: route.selectedRoute,
    isStopSelected: !!map.selectedStopId,
    naptanId: map.selectedStopId,
    panelState: map.panelState,
    userGeoLocation: map.geoLocation
  };
};

export default connect(mapStateToProps)(MapView);