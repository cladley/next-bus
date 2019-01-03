import React from "react";
import { connect } from "react-redux";
import { fetchPredictionsForStops } from "../actions/index";

class ArrivalsView extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Update called");
    this.fetchPredictions();
    this.timerId = setInterval(this.fetchPredictions.bind(this), 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  fetchPredictions() {
    this.props.dispatch(
      fetchPredictionsForStops(this.props.userRoutesByStopId)
    );
  }

  render() {
    return <div>Arrivals View</div>;
  }
}

const mapStateToProps = ({ user }) => {
  return {
    userRoutesByStopId: user.routes.allIds
  };
};

export default connect(mapStateToProps)(ArrivalsView);
