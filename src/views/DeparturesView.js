import React from "react";
import { connect } from "react-redux";
import { fetchPredictionsForStops } from "../actions/index";
import DeparturesBlock from "../components/DepartureBlock";
import Departure from "../components/Departure";
import DepartureStrip from "../components/DepartureStrip";
import DragGesture from "../components/DragGesture";
import { removeRoute } from "../actions/index";
import styles from "./departures-view.module.css";
import { Spring, Transition, animated } from "react-spring";

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
    const { predictions, dispatch } = this.props;

    return Object.keys(predictions).map(naptanId => {
      const stopName = this.getStopNameFrom(naptanId);
      const stopPredictions = predictions[naptanId];

      return (
        <DeparturesBlock key={naptanId} stopName={stopName}>
          <Transition
            items={stopPredictions}
            keys={p => p.line}
            leave={{
              opacity: 0
            }}
            enter={{
              opacity: 1
            }}
            from={{ opacity: 0 }}
          >
            {departure => props => (
              <DragGesture
                key={departure.line}
                className={styles.wrapper}
                style={props}
              >
                {({ dragProps, cancel, pause }) => {
                  return (
                    <DepartureStrip
                      x={dragProps.delta.x}
                      isDown={dragProps.down}
                      line={departure.line}
                      departures={departure.departures}
                      onDelete={() => {
                        pause();
                        dispatch(removeRoute(naptanId, departure, stopName));
                      }}
                    />
                  );
                }}
              </DragGesture>
            )}
          </Transition>
        </DeparturesBlock>
      );
    });
  }

  render() {
    const { predictions } = this.props;
    return (
      <div className={styles.container}>
        {predictions ? this.renderArrivals() : "loading"}
      </div>
    );
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
