import React from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../icons/back.svg";

import styles from "./header.module.css";

class BackButton extends React.Component {
  render() {
    return (
      <button className={styles.back} onClick={this.props.history.goBack}>
        <BackIcon />
      </button>
    );
  }
}

BackButton = withRouter(BackButton);

function Header() {
  return (
    <div className={styles.wrapper}>
      <BackButton />
      <NavLink
        className={styles["map-link"]}
        to="/map"
        activeClassName={styles.selected}
      >
        Map
      </NavLink>

      <NavLink to="/departures" activeClassName={styles.selected}>
        Departures
      </NavLink>
    </div>
  );
}

export default Header;
