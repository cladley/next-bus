import React from "react";
import { connect } from "react-redux";
import { fetchPredictionsForStops } from "../actions/index";
import DeparturesBlock from "../components/DepartureBlock";
import Departure from "../components/Departure";

class DeparturesView extends React.Component {
  componentDidMount() {
    const { allUserRoutesIds } = this.props;
    if (allUserRoutesIds.length > 0) {
      this.fetchPredictions();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.allUserRoutesIds.length === 0 &&
      this.props.allUserRoutesIds.length > 0
    ) {
      this.fetchPredictions();
      this.timerId = setInterval(this.fetchPredictions.bind(this), 10000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  fetchPredictions() {
    this.props.dispatch(fetchPredictionsForStops(this.props.allUserRoutesIds));
  }

  getStopNameFrom(naptanId) {
    return this.props.userRoutesByStopId[naptanId].stopName;
  }

  renderArrivals() {
    const { predictions } = this.props;

    return Object.keys(predictions).map(naptanId => {
      const stopName = this.getStopNameFrom(naptanId);
      const stopPredictions = predictions[naptanId];

      return (
        <DeparturesBlock stopName={stopName}>
          {stopPredictions.map(departure => {
            return (
              <Departure
                line={departure.line}
                departures={departure.departures}
              />
            );
          })}
        </DeparturesBlock>
      );
    });
  }

  render() {
    const { predictions } = this.props;

    return <div>{predictions ? this.renderArrivals() : "loading"}</div>;
  }
}

const mapStateToProps = ({ user, stops }) => {
  return {
    allUserRoutesIds: user.routes.allIds,
    userRoutesByStopId: user.routes.byNaptanId,
    predictions: user.predictions
  };
};

export default connect(mapStateToProps)(DeparturesView);
