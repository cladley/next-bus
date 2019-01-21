import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { setStopSelected, clearRoute, setPanelState } from "../actions/index";
import Map from "../components/Map";
import Panel, { appearances } from "../components/Panel";
import BusStopRoutesContainer from "../components/BusStopRoutesContainer";
import LineStops from "../components/LineStops";
import styles from "./mapview.module.css";

class MapView extends Component {
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
        this.props.dispatch(setStopSelected(null));
      }, 400);
    }
  };

  render() {
    const { isStopSelected, selectedRoute, naptanId, panelState } = this.props;

    let MapContainerClassNames = classNames(styles["map-container"], {
      [styles.active]: isStopSelected
    });

    return (
      <React.Fragment>
        <div className={MapContainerClassNames}>
          <Map />
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
            <h2>This is the full panel</h2>
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
    panelState: map.panelState
  };
};

export default connect(mapStateToProps)(MapView);
