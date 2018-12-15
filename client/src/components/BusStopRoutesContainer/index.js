import React, { Component } from "react";
import { connect } from "react-redux";
import BusStopRoutes from "../BusStopRoutes";
import { fetchRouteDetailsByStop } from "../../actions/index";

class BusStopRoutesContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRouteDetailsByStop(this.props.naptanId));
  }

  render() {
    const { routes } = this.props;

    return (
      <React.Fragment>
        {routes.length === 0 ? "loading" : <BusStopRoutes routes={routes} />}
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
