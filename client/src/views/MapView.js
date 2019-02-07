import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import {
  clearRoute,
  setPanelState,
  clearStopSelected,
  getGeoLocation
} from "../actions/index";
import Map from "../components/Map";
import Panel, { appearances } from "../components/Panel";
import BusStopRoutesContainer from "../components/BusStopRoutesContainer";
import LineStops from "../components/LineStops";
import Button from "../components/Button";
import { ReactComponent as LocationIcon } from "../icons/location.svg";

import styles from "./mapview.module.css";

class MapView extends Component {
  state = {
    triggerGeoLocation: false,
    geoPosition: null,
    center: { lat: 51.560913, lng: -0.120881 }
  };

  handleShowRoute = route => {
    console.log(route);
  };

  handlePanelChange = type => {
    if (type === appearances.full) {
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

  handleGeoButtonClick = () => {
    this.props.dispatch(
      getGeoLocation(() => {
        console.log("DONE");
        this.setState({
          center: this.props.userGeoLocation
        });
      })
    );
  };

  render() {
    const { isStopSelected, selectedRoute, naptanId, panelState } = this.props;

    let MapContainerClassNames = classNames(styles["map-container"], {
      [styles.active]: isStopSelected
    });

    return (
      <React.Fragment>
        <Button
          circular
          className={styles["geo-button"]}
          onClick={this.handleGeoButtonClick}
        >
          <LocationIcon />
        </Button>

        <div className={MapContainerClassNames}>
          <Map center={this.state.center} />
        </div>
        <Panel isOpen={panelState} onChangeOpen={this.handlePanelChange}>
          <Panel.Half>
            {isStopSelected && (
              <BusStopRoutesContainer
                naptanId={naptanId}
                showRoute={this.handleShowRoute}
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
