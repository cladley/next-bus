import React from "react";
import { connect } from "react-redux";
import { fetchPredictionsForStops } from "../actions/index";

const ArrivalItem = ({ line, destination, direction, arrivalTime }) => {
  const calculateArrivalTime = time => {
    const arrivalTime = new Date(time);
    const diff = new Date() - arrivalTime;
    return Math.floor(diff / 1000 / 60);
  };

  return (
    <div>
      <span>
        {line} - {destination} - {calculateArrivalTime(arrivalTime)}
      </span>
    </div>
  );
};

class ArrivalsView extends React.Component {
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
      const stopPredictions = predictions[naptanId];
      return (
        <React.Fragment>
          <h3>{this.getStopNameFrom(naptanId)}</h3>
          <ul>
            {stopPredictions.map(sp => {
              return sp.arrivals
                .sort((a1, a2) => {
                  const d1 = new Date(a1.arrival);
                  const d2 = new Date(a2.arrival);
                  return d1 - d2;
                })
                .map(p => (
                  <li>
                    <ArrivalItem
                      line={p.lineName}
                      destination={p.destination}
                      direction={p.direction}
                      arrivalTime={p.arrival}
                    />
                  </li>
                ));
            })}
          </ul>
        </React.Fragment>
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

export default connect(mapStateToProps)(ArrivalsView);
