import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";
import BusStopRoutes from "../BusStopRoutes";
import SlideTabs from "../SlideTabs";
import {
  addRoute,
  removeRoute,
  selectRoute,
  setPanelState
} from "../../actions/index";
import { appearances } from "../Panel";
import styles from "../BusStopRoutes/bus-stop-routes.module.css";

const AddedStopToast = ({ line, stopName }) => {
  return (
    <div className={styles["toast-container"]}>
      <div className={styles["toast-content"]}>
        <span className={styles.line}>{line}</span> <span>{stopName}</span>
      </div>
      <Link to="/departures" className={styles.link}>
        View
      </Link>
    </div>
  );
};

class BusStopRoutesContainer extends Component {
  handleToggleRoute = (route, isCurrentlySelectedByUser = false) => {
    const { naptanId, stopName } = this.props;
    if (!isCurrentlySelectedByUser) {
      this.props.dispatch(addRoute(naptanId, route, stopName));
      toast(<AddedStopToast line={route.line} stopName={stopName} />, {
        className: styles.toast,
        closeButton: false
      });

      // toast.info(`${route.line} - ${stopName} added`, {
      //   className: styles.toast,
      //   closeButton: false
      // });
    } else {
      this.props.dispatch(removeRoute(naptanId, route, stopName));
    }
  };

  handleShowRoute = route => {
    this.props.dispatch(setPanelState(appearances.full));
    this.props.dispatch(selectRoute(route));
  };

  render() {
    const { routes, naptanId, stopName, isQuickView } = this.props;

    return (
      <React.Fragment>
        {routes.length === 0 ? (
          "loading"
        ) : (
          <BusStopRoutes
            stopName={stopName}
            routes={routes}
            toggleRoute={this.handleToggleRoute}
            showRoute={this.handleShowRoute}
            isQuickView={isQuickView}
          />
        )}
      </React.Fragment>
    );
  }
}

const getStopName = (stops, naptanId) => {
  return stops.byNaptanId[naptanId].commonName;
};

const constructRoutes = (naptanId, stopRouteDetails, selectedUserRoutes) => {
  const userSelectedRoutesAtStop = selectedUserRoutes[naptanId];

  const routeDetails = cloneDeep(stopRouteDetails);

  if (userSelectedRoutesAtStop) {
    routeDetails.forEach(route => {
      userSelectedRoutesAtStop.routes.forEach(userRoute => {
        if (route.line === userRoute.line) {
          route.isSelectedByUser = true;
        }
      });
    });
  }

  return routeDetails;
};

const mapStateToProps = ({ map, stops, user }, ownProps) => {
  return {
    routes: constructRoutes(
      ownProps.naptanId,
      map.stopRouteDetails,
      user.routes.byNaptanId
    ),
    stopName: getStopName(stops, ownProps.naptanId)
  };
};

export default connect(mapStateToProps)(BusStopRoutesContainer);
