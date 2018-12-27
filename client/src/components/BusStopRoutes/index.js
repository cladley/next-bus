import React, { Component } from "react";

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
    const { routes, toggleRoute } = this.props;
    const dayTimeRoutes = this.getDayBusRoutes(routes);
    const nightTimeRoutes = this.getNightBusRoutes(routes);

    return (
      <React.Fragment>
        <h1>{this.props.stopName}</h1>
        <h4>Day Time Routes</h4>
        <ul>
          {dayTimeRoutes.map(route => (
            <li
              key={route.line}
              onClick={() => toggleRoute(route, route.isSelectedByUser)}
            >
              {route.line} : {route.destination}{" "}
              {route.isSelectedByUser ? "SELECTED" : ""}
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

export default BusStopRoutes;
