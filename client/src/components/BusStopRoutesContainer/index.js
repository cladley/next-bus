import React, { Component } from "react";
import { connect } from "react-redux";
import BusStopRoutes from "../BusStopRoutes";
import { fetchRouteDetailsByStop, addRoute } from "../../actions/index";

class BusStopRoutesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAddRoute = this.handleAddRoute.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchRouteDetailsByStop(this.props.naptanId));
  }

  handleAddRoute(route) {
    const { naptanId, stopName } = this.props;
    this.props.dispatch(addRoute(naptanId, route, stopName));
  }

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
            addRoute={this.handleAddRoute}
          />
        )}
      </React.Fragment>
    );
  }
}

const getStopName = (stops, naptanId) => {
  return stops.byNaptanId[naptanId].commonName;
};

const mapStateToProps = ({ map, stops }, ownProps) => {
  return {
    routes: map.stopRouteDetails,
    stopName: getStopName(stops, ownProps.naptanId)
  };
};

export default connect(mapStateToProps)(BusStopRoutesContainer);
