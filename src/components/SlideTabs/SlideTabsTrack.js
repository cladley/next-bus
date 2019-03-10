import React from "react";
import { animated } from "react-spring";
import styles from "./slide-tabs.module.css";

const SlideTabTrack = React.forwardRef(
  ({ children, x, deltaX, velocity, down, onBoundsExceeded }, ref) => {
    if (Math.abs(velocity.x) > 50) {
      const direction = deltaX.getValue() < 0 ? "left" : "right";
      onBoundsExceeded(direction);
    } else if (Math.abs(deltaX.getValue()) > window.innerWidth / 2 && down) {
      const direction = deltaX.getValue() < 0 ? "left" : "right";
      onBoundsExceeded(direction);
    }

    return (
      <animated.div
        style={{
          transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
        }}
        className={styles["tabs-slide"]}
        ref={ref}
      >
        {children}
      </animated.div>
    );
  }
);

export default SlideTabTrack;
