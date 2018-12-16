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
    const { routes } = this.props;
    const dayTimeRoutes = this.getDayBusRoutes(routes);
    const nightTimeRoutes = this.getNightBusRoutes(routes);

    return (
      <React.Fragment>
        <h4>Day Time Routes</h4>
        <ul>
          {dayTimeRoutes.map(route => (
            <li key={route.line}>
              {route.line} : {route.destination}
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
