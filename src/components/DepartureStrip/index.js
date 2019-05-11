import React from "react";
import { Spring, animated } from "react-spring";
import Departure from "../Departure";
import styles from "./departure-strip.module.css";

class DepartureStrip extends React.Component {
  isDeleting = false;
  stripElement = null;
  stripWidth = null;
  previousX = 0;

  componentDidMount() {
    this.stripWidth = this.stripElement.getBoundingClientRect().width;
  }

  getTransformValue = x => {
    if (this.isDeleting) {
      return `translate3d(${this.previousX}, 0, 0)`;
      // return x.interpolate(x => `translate3d(${x}px, 0, 0)`);
    } else if (this.props.isDown) {
      this.previousX = x.getValue();
      return x.interpolate(x => `translate3d(${x}px, 0, 0)`);
    } else {
      return "";
    }
  };

  render() {
    const { x, isDown, line, departures, onDelete } = this.props;

    if (this.stripWidth && Math.abs(x) > this.stripWidth / 2) {
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
            ref={element => (this.stripElement = element)}
            className={styles["slide-panel"]}
            style={{
              transform: this.getTransformValue(props.x),
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
