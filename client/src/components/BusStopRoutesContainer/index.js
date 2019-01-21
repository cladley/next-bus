import React, { Component } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import BusStopRoutes from "../BusStopRoutes";
import {
  addRoute,
  removeRoute,
  selectRoute,
  setPanelState
} from "../../actions/index";
import { appearances } from "../Panel";

class BusStopRoutesContainer extends Component {
  handleToggleRoute = (route, isCurrentlySelectedByUser = false) => {
    const { naptanId, stopName } = this.props;
    if (!isCurrentlySelectedByUser) {
      this.props.dispatch(addRoute(naptanId, route, stopName));
    } else {
      this.props.dispatch(removeRoute(naptanId, route, stopName));
    }
  };

  handleShowRoute = route => {
    this.props.dispatch(setPanelState(appearances.full));
    this.props.dispatch(selectRoute(route));
  };

  render() {
    const { routes, naptanId, stopName } = this.props;

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
