import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { loadUserRoutes } from "./actions";
import styles from "./app.module.css";
import MapView from "./views/MapView";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadUserRoutes());
  }

  render() {
    return (
      <Router>
        <div className={styles["main-container"]}>
          <MapView />
        </div>
      </Router>
    );
  }
}

export default connect(null)(App);
