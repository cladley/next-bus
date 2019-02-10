import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition, animated } from "react-spring";
import Container from "../Layout/Container";
import styles from "./bus-stop-routes.module.css";

class BusStopRoutes extends Component {
  componentDidMount() {}

  getNightBusRoutes(routes) {
    return routes.filter(route => {
      return /n.+/gm.test(route.line);
    });
  }

  getDayBusRoutes(routes) {
    return routes.filter(route => {
      return !/n.+/gm.test(route.line);
    });
  }

  createRoutesContent() {
    const { routes, toggleRoute, showRoute, isQuickView } = this.props;

    const dayTimeRoutes = this.getDayBusRoutes(routes);
    const nightTimeRoutes = this.getNightBusRoutes(routes);

    return (
      <Transition
        native
        items={isQuickView === false}
        from={{ opacity: 0, transform: "translate3d(0, 60px, 0)" }}
        enter={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
      >
        {show =>
          show &&
          (props => (
            <animated.div style={props}>
              <h4>Day Time Routes</h4>
              <ul>
                {dayTimeRoutes.map(route => (
                  <li key={route.line}>
                    <span
                      onClick={() => toggleRoute(route, route.isSelectedByUser)}
                    >
                      {route.line} : {route.destination}{" "}
                    </span>
                    {route.isSelectedByUser ? "SELECTED" : ""}
                    <button onClick={() => showRoute(route)}>Show route</button>
                  </li>
                ))}
              </ul>

              <h4>Night Time Routes</h4>
              <ul>
                {nightTimeRoutes.map(route => (
                  <li key={route.line}>
                    {route.line} : {route.destination}
                  </li>
                ))}
              </ul>
            </animated.div>
          ))
        }
      </Transition>
    );
  }

  render() {
    return (
      <Container>
        <header>
          <h1 className={styles.title}>{this.props.stopName}</h1>
        </header>

        {this.createRoutesContent()}
      </Container>
    );
  }
}

BusStopRoutes.propTypes = {
  showRoute: PropTypes.func
};

export default BusStopRoutes;
