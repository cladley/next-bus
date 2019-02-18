import React from "react";
import styles from "./bus-routes.module.css";
import { ReactComponent as EyeIcon } from "../../icons/eye.svg";

const BusRoutes = ({ routes, onShowRoute, onToggleRoute }) => {
  return (
    <div className={styles.container}>
      <ul className={styles["route-list"]}>
        {routes.map(route => (
          <li key={route.line}>
            <div onClick={() => onToggleRoute(route, route.isSelectedByUser)}>
              <span className={styles.line}>{route.line}</span>{" "}
              <span className={styles.destination}>{route.destination}</span>
            </div>
            {route.isSelectedByUser ? "SELECTED" : ""}
            <button
              className={styles["show-route-button"]}
              onClick={() => onShowRoute(route)}
            >
              <EyeIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusRoutes;
