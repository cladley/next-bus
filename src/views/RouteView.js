import React from "react";
import { connect } from "react-redux";
import RouteMap from "../components/RouteMap";
import RouteList from "../components/RouteList";
import { fetchStopsForLine } from "../actions";
import styles from "./route-views.module.css";
import {
  header,
  title
} from "../components/BusStopRoutes/bus-stop-routes.module.css";

class RouteView extends React.Component {
  componentDidMount() {
    const { route, dispatch } = this.props;
    const { line, direction } = route;
    dispatch(fetchStopsForLine(line, direction));
  }

  render() {
    const { stops, route, routePath } = this.props;
    const { routeSectionName } = route;

    return (
      <div className={styles.wrapper}>
        <div className={styles["map-wrapper"]}>
          <RouteMap path={routePath} />;
        </div>
        <div className={styles["route-list-wrapper"]}>
          <div className={styles["scroll-container"]}>
            <header className={header}>
              <h3 className={title}>{routeSectionName}</h3>
            </header>
            {!!stops && <RouteList stops={stops} />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ route }) => {
  return {
    stops: route.routeStops,
    routePath: route.routePath
  };
};

export default connect(mapStateToProps)(RouteView);
