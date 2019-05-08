import React from "react";
import { connect } from "react-redux";
import { fetchPredictionsForStops } from "../actions/index";
import DeparturesBlock from "../components/DepartureBlock";
import Departure from "../components/Departure";
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
                {({ dragProps, cancel }) => {
                  // TODO: Need to figure out the width at
                  // which we will remove the item. I've hard coded
                  // 210 here.
                  if (Math.abs(dragProps.delta.x) > 210) {
                    dispatch(removeRoute(naptanId, departure, stopName));
                    cancel();
                  }

                  return (
                    <Spring
                      native
                      to={{ x: Math.min(0, dragProps.delta.x) }}
                      config={{ tension: 0, friction: 2, precision: 0.4 }}
                    >
                      {props => (
                        <animated.div
                          className={styles["slide-panel"]}
                          style={{
                            transform: dragProps.down
                              ? props.x.interpolate(
                                  x => `translate3d(${x}px, 0, 0)`
                                )
                              : "",
                            transition: dragProps.down ? "none" : ""
                          }}
                        >
                          <Departure
                            line={departure.line}
                            departures={departure.departures}
                          />
                          <div className={styles["delete-panel"]}>Delete</div>
                        </animated.div>
                      )}
                    </Spring>
                  );
                }}
              </DragGesture>
            )}
          </Transition>

          {/* {stopPredictions.map(departure => {
            console.log(departure);

            return (
              <DragGesture key={departure.line} className={styles.wrapper}>
                {({ dragProps, cancel }) => {
                  if (Math.abs(dragProps.delta.x) > 210) {
                    cancel();
                    // dispatch(removeRoute(naptanId, departure, stopName));
                  }

                  return (
                    <Spring
                      native
                      to={{ x: Math.min(0, dragProps.delta.x) }}
                      config={{ tension: 0, friction: 2, precision: 0.4 }}
                    >
                      {props => (
                        <animated.div
                          className={styles["slide-panel"]}
                          style={{
                            transform: dragProps.down
                              ? props.x.interpolate(
                                  x => `translate3d(${x}px, 0, 0)`
                                )
                              : "",
                            transition: dragProps.down ? "none" : ""
                          }}
                        >
                          <Departure
                            line={departure.line}
                            departures={departure.departures}
                          />
                          <div className={styles["delete-panel"]}>Delete</div>
                        </animated.div>
                      )}
                    </Spring>
                  );
                }}
              </DragGesture>
            );
          })} */}
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
