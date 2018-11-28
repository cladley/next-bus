import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Container from "./components/Container";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Container />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
