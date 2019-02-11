import React from "react";
import styles from "./departure-block.module.css";

class DepartureBlock extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles["stop-name"]}>{this.props.stopName}</h2>
        </header>
        <div className={styles["departures-container"]}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DepartureBlock;
