import React, { Component } from "react";
import PropTypes from "prop-types";

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

  render() {
    const { routes, toggleRoute, showRoute } = this.props;
    const dayTimeRoutes = this.getDayBusRoutes(routes);
    const nightTimeRoutes = this.getNightBusRoutes(routes);

    return (
      <React.Fragment>
        <h1>{this.props.stopName}</h1>
        <h4>Day Time Routes</h4>
        <ul>
          {dayTimeRoutes.map(route => (
            <li key={route.line}>
              <span onClick={() => toggleRoute(route, route.isSelectedByUser)}>
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
      </React.Fragment>
    );
  }
}

BusStopRoutes.propTypes = {
  showRoute: PropTypes.func
};

export default BusStopRoutes;
