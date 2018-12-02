import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Container from "./components/Container";
import styles from "./app.module.css";

class App extends Component {
  state = {
    isDrawerOpen: false
  };

  toggleDrawer = () => {
    this.setState(prevState => {
      return {
        isDrawerOpen: !prevState.isDrawerOpen
      };
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={styles["main-container"]}>
            <button onClick={this.toggleDrawer}>Toggle Drawer</button>
            <Drawer
              isOpen={this.state.isDrawerOpen}
              closeOnBackdropClick={true}
              closeDrawer={this.toggleDrawer}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
