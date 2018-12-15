import React, { Component } from "react";

class BusStopRoutes extends Component {
  componentDidMount() {}

  render() {
    const { routes } = this.props;
    return (
      <ul>
        {routes.map(route => (
          <li>
            {route.line} : {route.destination}
          </li>
        ))}
      </ul>
    );
  }
}

export default BusStopRoutes;
