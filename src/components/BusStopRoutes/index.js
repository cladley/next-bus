import React, { Component } from "react";
import PropTypes from "prop-types";
import { Transition, animated } from "react-spring";
import Container from "../Layout/Container";
import BusRoutes from "../BusRoutes";
import styles from "./bus-stop-routes.module.css";
import SlideTabs from "../SlideTabs";

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

  getAllRoutesLine(routes) {
    return [...new Set(routes.map(r => r.line))].join(", ");
  }

  createRoutesContent() {
    const { routes, toggleRoute, showRoute, isQuickView } = this.props;

    const dayTimeRoutes = this.getDayBusRoutes(routes);
    const nightTimeRoutes = this.getNightBusRoutes(routes);
    return (
      <Transition
        native
        unique
        items={isQuickView === false}
        from={{ opacity: 0, transform: "translate3d(0, 60px, 0)" }}
        enter={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
        leave={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
      >
        {show =>
          show &&
          (props => (
            <animated.div style={props}>
              <SlideTabs>
                <SlideTabs.Tab title="Day Routes">
                  <BusRoutes
                    title="Day Routes"
                    routes={dayTimeRoutes}
                    onToggleRoute={toggleRoute}
                    onShowRoute={showRoute}
                  />
                </SlideTabs.Tab>
                <SlideTabs.Tab title="Night Routes">
                  <BusRoutes
                    title="Night Routes"
                    routes={nightTimeRoutes}
                    onToggleRoute={toggleRoute}
                    onShowRoute={showRoute}
                    isNight={true}
                  />
                </SlideTabs.Tab>
              </SlideTabs>
            </animated.div>
          ))
        }
      </Transition>
    );
  }

  render() {
    const { routes, isQuickView, stopName } = this.props;
    const allRoutesSet = this.getAllRoutesLine(routes);
    return (
      <React.Fragment>
        <header className={styles.header} data-drag-handle>
          <Transition
            items={stopName}
            from={{ transform: "translate3d(0,-40px,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(0, 40px, 0)" }}
          >
            {item => props => (
              <animated.h3 style={props} className={styles.title}>
                {item}
              </animated.h3>
            )}
          </Transition>
          {/* <h3 className={styles.title}>{stopName}</h3> */}
        </header>

        {isQuickView ? (
          <div className={styles["quick-routes"]}>
            <p>
              Serves: <span>{allRoutesSet}</span>
            </p>
          </div>
        ) : null}

        {this.createRoutesContent()}
      </React.Fragment>
    );
  }
}

BusStopRoutes.propTypes = {
  showRoute: PropTypes.func
};

export default BusStopRoutes;
