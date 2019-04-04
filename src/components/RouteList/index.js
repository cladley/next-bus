import React from "react";
import styles from "./route-list.module.css";

const RouteListItem = () => {};

class RouteList extends React.Component {
  render() {
    const { stops } = this.props;

    return (
      <div className={styles["scroll-container"]}>
        <ul className={styles.list}>
          {stops.map(stop => (
            <li key={stop.id} className={styles.item}>
              <span className={styles.name}>{stop.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RouteList;
