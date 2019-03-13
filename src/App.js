import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import { loadUserRoutes } from "./actions";
import styles from "./app.module.css";
import "react-toastify/dist/ReactToastify.min.css";
import MapView from "./views/MapView";
import HomeView from "./views/HomeView";
import DeparturesView from "./views/DeparturesView";

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
            <Route path="/departures" component={DeparturesView} />
          </Switch>
          <ToastContainer
            transition={Slide}
            position="bottom-center"
            hideProgressBar={true}
            autoClose={4000000}
          />
        </div>
      </Router>
    );
  }
}

export default connect(null)(App);
