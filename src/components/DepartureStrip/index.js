import React from "react";
import { Spring, animated } from "react-spring";
import Departure from "../Departure";
import styles from "./departure-strip.module.css";

class DepartureStrip extends React.Component {
  isDeleting = false;

  render() {
    const { x, isDown, line, departures, onDelete } = this.props;

    if (Math.abs(x) > 210) {
      if (!this.isDeleting) {
        onDelete();
        this.isDeleting = true;
      }
    }

    return (
      <Spring
        native
        to={{ x: Math.min(0, x) }}
        config={{ tension: 0, friction: 2, precision: 0.4 }}
      >
        {props => (
          <animated.div
            className={styles["slide-panel"]}
            style={{
              transform: isDown
                ? props.x.interpolate(x => `translate3d(${x}px, 0, 0)`)
                : "",
              transition: isDown ? "none" : ""
            }}
          >
            <Departure line={line} departures={departures} />
            <div className={styles["delete-panel"]}>Delete</div>
          </animated.div>
        )}
      </Spring>
    );
  }
}

export default DepartureStrip;
