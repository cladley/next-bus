import React from "react";
import { connect } from "react-redux";
import Container from "../Layout/Container";
import { Transition, animated } from "react-spring";
import { fetchStopsForLine } from "../../actions";
import classNames from "classnames";
import styles from "./route-stops.module.css";

class RouteStops extends React.Component {
  state = {
    isReady: false
  };

  componentDidMount() {
    const { line, direction, dispatch } = this.props;
    dispatch(fetchStopsForLine(line, direction));
  }

  renderStops(stops) {
    return stops.map(s => <li key={s.name}>{s.name}</li>);
  }

  render() {
    const { stops } = this.props;
    const isLoaded = !!stops;

    const listClassNames = classNames(styles.list, {
      [styles.ready]: isLoaded
    });

    return stops ? (
      <Container>
        <Transition
          native
          items={isLoaded}
          from={{ transform: "scaleY(0)" }}
          enter={{ transform: "scaleY(1)" }}
          config={{ delay: 200 }}
        >
          {item => props => (
            <animated.div style={props} className={styles.line} />
          )}
        </Transition>

        <ul className={listClassNames}>{this.renderStops(stops)}</ul>
      </Container>
    ) : (
      <div>loading</div>
    );
  }
}

const mapStateToProps = ({ route }) => {
  return {
    stops: route.routeStops
  };
};

export default connect(mapStateToProps)(RouteStops);
