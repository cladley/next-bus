import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { setStopSelected, clearRoute } from "../actions/index";
import Map from "../components/Map";
import Panel, { appearances } from "../components/Panel";
import Drawer from "../components/Drawer";
import BusStopRoutesContainer from "../components/BusStopRoutesContainer";
import styles from "./mapview.module.css";
import { ARRIVAL_PREDICTIONS_FOR_STOP } from "../tfl-api/urls";

class MapView extends Component {
  state = {
    isExpanded: false,
    appearance: appearances.closed
  };

  handleClosedDrawer = () => {
    this.props.dispatch(setStopSelected(null));
  };

  handleTest = () => {
    this.setState(prevState => {
      return {
        isExpanded: !prevState.isExpanded
      };
    });
  };

  handleShowRoute = route => {
    console.log(route);
  };

  handlePanelChange = type => {
    if (type === appearances.full) {
      this.props.dispatch(clearRoute());
    } else if (type === appearances.half) {
      this.props.dispatch(setStopSelected(null));
    }
  };

  render() {
    const { showDrawer, isStopSelected, selectedRoute, naptanId } = this.props;
    let panelAppearance = appearances.closed;

    if (!!selectedRoute) {
      panelAppearance = appearances.full;
    } else if (isStopSelected) {
      panelAppearance = appearances.half;
    }

    let MapContainerClassNames = classNames(styles["map-container"], {
      [styles.active]: showDrawer
    });

    return (
      <React.Fragment>
        <div className={MapContainerClassNames}>
          <Map />
        </div>
        <Panel isOpen={panelAppearance} onChangeOpen={this.handlePanelChange}>
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
          </Panel.Full>
        </Panel>
        {/* <Drawer 
          isOpen={this.props.showDrawer}
          onDrawerClosed={this.handleClosedDrawer}
          ref={drawer => (this.drawer = drawer)}
          test={this.handleTest}
          isExpanded={this.state.isExpanded}
        >
          {isStopSelected && <BusStopRoutesContainer naptanId={naptanId} />}
        </Drawer> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ map, route }) => {
  return {
    selectedRoute: route.selectedRoute,
    showDrawer: !!map.selectedStopId,
    isStopSelected: !!map.selectedStopId,
    naptanId: map.selectedStopId
  };
};

export default connect(mapStateToProps)(MapView);
