import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "./Home";
import MapView from "../views/MapView";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function First() {
  return (
    <div>
      <span>First</span>
      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
    </div>
  );
}

function Second() {
  return (
    <div>
      <span>Second</span>
      <section>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
      </section>
    </div>
  );
}

function Third() {
  return (
    <div>
      <span>Third</span>
      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
    </div>
  );
}

function Container({ location }) {
  return (
    <div>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={"fade"}
        >
          <section className="route-section">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/first" component={First} />
              <Route path="/second" component={Second} />
              <Route path="/third" component={Third} />
              <Route path="/map" component={MapView} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(Container);
