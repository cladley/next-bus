import React from "react";
import { Spring, animated } from "react-spring";
import classNames from "classnames";
import styles from "./bus-stop-map-marker.module.css";

function BusStopMapMarker({ id, onSelected, isSelected, index, stopLetter }) {
  const delay = index * 50;

  return (
    <Spring
      native
      from={{ opacity: 0, transform: "translate3d(0,-200px,0) scale(0)" }}
      to={{ opacity: 1, transform: "translate3d(0,0,0) scale(1)" }}
      delay={delay}
    >
      {props => (
        <animated.div style={props} onClick={() => onSelected(id)}>
          <span
            className={classNames(styles["stop-marker"], {
              [styles["is-active"]]: isSelected
            })}
          >
            <span className={styles["stop-marker__inner"]}>{stopLetter}</span>
          </span>
        </animated.div>
      )}
    </Spring>
  );
}

export default BusStopMapMarker;
