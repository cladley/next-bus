import React, { Component } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import BusStopRoutes from "../BusStopRoutes";
import {
  fetchRouteDetailsByStop,
  addRoute,
  removeRoute
} from "../../actions/index";

class BusStopRoutesContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRouteDetailsByStop(this.props.naptanId));
  }

  handleToggleRoute = (route, isCurrentlySelectedByUser = false) => {
    const { naptanId, stopName } = this.props;
    if (!isCurrentlySelectedByUser) {
      this.props.dispatch(addRoute(naptanId, route, stopName));
    } else {
      this.props.dispatch(removeRoute(naptanId, route, stopName));
    }
  };

  handleToggleRoute(route) {}

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
  // DO a deep copy of array of objects
  // const routeDetails = stopRouteDetails.map(r => {
  //   return { ...r };
  // });

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
