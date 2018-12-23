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
    const { naptanId } = this.props;
    this.props.dispatch(addRoute(naptanId, route));
  }

  render() {
    const { routes, naptanId } = this.props;

    return (
      <React.Fragment>
        {routes.length === 0 ? (
          "loading"
        ) : (
          <BusStopRoutes routes={routes} addRoute={this.handleAddRoute} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ map }) => {
  return {
    routes: map.stopRouteDetails
  };
};

export default connect(mapStateToProps)(BusStopRoutesContainer);
