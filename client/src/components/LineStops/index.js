import React from "react";
import { connect } from "react-redux";
import { fetchStopsForLine } from "../../actions";

class LineStops extends React.Component {
  componentDidMount() {
    const { line, direction, dispatch } = this.props;
    dispatch(fetchStopsForLine(line, direction));
  }

  renderStops(stops) {
    return stops.slice(0, 10).map(s => {
      return <div>{s.name}</div>;
    });
  }

  render() {
    const { stops } = this.props;

    return stops ? this.renderStops(stops) : <div>Loading</div>;
  }
}

const mapStateToProps = ({ route }) => {
  return {
    stops: route.routeStops
  };
};

export default connect(mapStateToProps)(LineStops);
