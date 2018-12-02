import React, { Component } from "react";
import { connect } from "react-redux";

class BusStopDetails extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.lines.map(line => (
            <li>{line.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(null)(BusStopDetails);
