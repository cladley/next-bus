import React from "react";
import classNames from "classnames";
import styles from "./bus-routes.module.css";
import { ReactComponent as EyeIcon } from "../../icons/eye.svg";
import { ReactComponent as StarIcon } from "../../icons/star.svg";

const BusRoutes = ({ routes, onShowRoute, onToggleRoute, isNight }) => {
  const nightStyles = isNight
    ? { background: "#2e4482", color: "white" }
    : null;

  return (
    <div className={styles.container} style={nightStyles}>
      <ul className={styles["route-list"]}>
        {routes.map(route => (
          <li key={route.line}>
            <div>
              <span className={styles.line}>{route.line}</span>{" "}
              <span className={styles.destination}>{route.destination}</span>
            </div>
            <button
              className={classNames(styles["toggle-route-button"], {
                [styles["is-active"]]: route.isSelectedByUser
              })}
              onClick={() => onToggleRoute(route, route.isSelectedByUser)}
            >
              <StarIcon />
            </button>
            {/* <button
              className={styles["show-route-button"]}
              onClick={() => onShowRoute(route)}
            >
              <EyeIcon fill={isNight ? "white" : "black"} />
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusRoutes;
