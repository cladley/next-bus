import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { getStopByLatLon } from "./tfl-api";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  componentDidMount() {
    getStopByLatLon(51.560556, -0.12123).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
