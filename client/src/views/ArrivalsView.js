import React from "react";
import { connect } from "react-redux";
import { fetchPredictionsForStop } from "../actions/index";

class ArrivalsView extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPredictionsForStop("490013836F"));
  }

  render() {
    return <div>Arrivals View</div>;
  }
}

export default connect(null)(ArrivalsView);
