import React from "react";
import { connect } from "react-redux";
import Container from "../Layout/Container";
import { Transition, Trail, animated, config } from "react-spring";
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

  renderStopsForAnimation(stops) {
    return (
      <Trail
        native
        items={stops}
        keys={stop => stop.name}
        from={{ transform: "translate3d(-100%, 0, 0)" }}
        to={{ transform: "translate3d(0, 0, 0)" }}
      >
        {stop => props => <animated.li style={props}>{stop.name}</animated.li>}
      </Trail>
    );

    // return stops.map(s => <li>{s.name}</li>);
  }

  renderRemainingStop(stops) {
    return stops.map(s => <li>{s.name}</li>);
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

        <ul className={listClassNames}>
          {this.renderStopsForAnimation(stops.slice(0, 20))}
          {this.renderRemainingStop(stops.slice(20))}
        </ul>
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
