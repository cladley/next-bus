import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loadUserRoutes } from "./actions";
import styles from "./app.module.css";
import MapView from "./views/MapView";
import HomeView from "./views/HomeView";
import ArrivalsView from "./views/ArrivalsView";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadUserRoutes());
  }

  render() {
    return (
      <Router>
        <div className={styles["main-container"]}>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/map" component={MapView} />
            <Route path="/arrivals" component={ArrivalsView} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(null)(App);
