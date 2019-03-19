import React from "react";
import { Transition, Spring, animated } from "react-spring";

function BusStopMapMarker({ id, onSelected, isSelected, index }) {
  const styles = {
    backgroundColor: isSelected ? "green" : "black",
    height: isSelected ? "20px" : "10px",
    width: isSelected ? "20px" : "10px",
    borderRadius: "50%"
  };

  const delay = index * 50;

  return (
    <Spring
      native
      from={{ opacity: 0, transform: "translate3d(0,-200px,0) scale(0)" }}
      to={{ opacity: 1, transform: "translate3d(0,0,0) scale(1)" }}
      delay={delay}
    >
      {props => (
        <animated.div
          style={props}
          className="marker"
          onClick={() => onSelected(id)}
        />
      )}
    </Spring>
  );
}

export default BusStopMapMarker;
