import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Map from "../components/Map";
import Drawer from "../components/Drawer";
import BusStopRoutesContainer from "../components/BusStopRoutesContainer";
import styles from "./mapview.module.css";

class MapView extends Component {
  state = {
    isDrawerOpen: false
  };

  closeDrawer = () => {
    console.log("close drawer clicked");
  };

  render() {
    const { showDrawer, isStopSelected, naptanId } = this.props;

    let MapContainerClassNames = classNames(styles["map-container"], {
      [styles.active]: showDrawer
    });

    return (
      <React.Fragment>
        <div className={MapContainerClassNames}>
          <Map />
        </div>
        <Drawer isOpen={this.props.showDrawer} closeDrawer={this.closeDrawer}>
          {isStopSelected && <BusStopRoutesContainer naptanId={naptanId} />}
        </Drawer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ map }) => {
  return {
    showDrawer: !!map.selectedStopId,
    isStopSelected: !!map.selectedStopId,
    naptanId: map.selectedStopId
  };
};

export default connect(mapStateToProps)(MapView);
