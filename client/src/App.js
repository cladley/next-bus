import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import styles from "./app.module.css";
import MapView from "./views/MapView";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={styles["main-container"]}>
            <MapView />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
