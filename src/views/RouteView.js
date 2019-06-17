import React from "react";
import { connect } from "react-redux";
import RouteMap from "../components/RouteMap";
import RouteList from "../components/RouteList";
import BusyIndicator from "../components/BusyIndicator";
import Delayed from "../components/Delayed";
import { fetchStopsForLine } from "../actions";
import styles from "./route-views.module.css";
import {
  header,
  title
} from "../components/BusStopRoutes/bus-stop-routes.module.css";

class RouteView extends React.Component {
  state = {
    isRouteMapReady: false,
    selectedStop: null,
    shouldListItemScrollIntoView: false
  };

  componentDidMount() {
    const { route, dispatch } = this.props;
    const { line, direction } = route;
    dispatch(fetchStopsForLine(line, direction));
  }

  handleRouteMapComponentReady = () => {
    this.setState({
      isRouteMapReady: true
    });
  };

  handleOnStopSelected = (stop, shouldScrollItem) => {
    this.setState({
      selectedStop: stop,
      shouldListItemScrollIntoView: shouldScrollItem
    });
  };

  render() {
    const { stops, route, routePath, targetStop } = this.props;
    const { isRouteMapReady, selectedStop } = this.state;
    // console.log(selectedStop);
    const { routeSectionName } = route;
    // TODO: use shouldShowComponents to animate in screens in.
    const shouldShowComponents = isRouteMapReady && !!stops;

    return (
      <div className={styles.wrapper}>
        {!isRouteMapReady && <BusyIndicator />}
        <div className={styles["map-wrapper"]}>
          <Delayed waitBeforeShow={1000}>
            {!!stops && (
              <RouteMap
                path={routePath}
                stops={stops}
                onReady={this.handleRouteMapComponentReady}
                targetStop={targetStop}
                selectedStop={selectedStop}
                onStopSelected={this.handleOnStopSelected}
              />
            )}
          </Delayed>
        </div>
        <div className={styles["route-list-wrapper"]}>
          <div className={styles["scroll-container"]}>
            <Delayed waitBeforeShow={1000}>
              <header className={header}>
                <h3 className={title}>{routeSectionName}</h3>
              </header>
              {!!stops && (
                <RouteList
                  stops={stops}
                  selectedStop={selectedStop}
                  onStopSelected={this.handleOnStopSelected}
                  shouldListItemScrollIntoView={
                    this.state.shouldListItemScrollIntoView
                  }
                />
              )}
            </Delayed>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ route, map }) => {
  return {
    stops: route.routeStops,
    routePath: route.routePath,
    targetStop: map.viewableStops[map.selectedStopId]
  };
};

export default connect(mapStateToProps)(RouteView);
