import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Transition, animated } from "react-spring";
import classNames from "classnames";

import { clearRoute, setPanelState, clearStopSelected } from "../actions/index";
import RouteView from "../views/RouteView";
import Map from "../components/Map";
import Panel, { appearances } from "../components/Panel";
import BusStopRoutesContainer from "../components/BusStopRoutesContainer";
import RouteStops from "../components/RouteStops";
import GeoLocationButton from "../components/GeoLocationButton";
import BusyIndicator from "../components/BusyIndicator";
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

  handlePanelChange = (to, from) => {
    if (to === appearances.half) {
      // console.log("here we are");
      this.props.dispatch(setPanelState(appearances.half));

      // console.log(from);
    } else if (to === appearances.closed) {
      this.props.dispatch(setPanelState(appearances.closed));
      setTimeout(() => {
        this.props.dispatch(clearStopSelected());
      }, 400);
    } else if (to === appearances.short) {
      this.props.dispatch(setPanelState(appearances.short));
    }

    if (from === appearances.full) {
      setTimeout(this.props.dispatch(clearRoute()));
    } else if (from === appearances.half) {
      // setTimeout(() => {
      //   this.props.dispatch(clearStopSelected());
      // }, 400);
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
    const {
      isStopSelected,
      isLoadingStops,
      selectedRoute,
      naptanId,
      panelState,
      stops
    } = this.props;

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

          <Transition
            native
            unique
            items={isLoadingStops}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {show =>
              show &&
              (props => (
                <animated.div className={styles.cover} style={props}>
                  <BusyIndicator />
                </animated.div>
              ))
            }
          </Transition>
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
              <RouteView route={selectedRoute} />
              // <RouteStops
              //   line={selectedRoute.line}
              //   direction={selectedRoute.direction}
              // />
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
    userGeoLocation: map.geoLocation,
    isLoadingStops: map.loadingStops
  };
};

export default connect(mapStateToProps)(MapView);
