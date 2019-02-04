import React from "react";
import { Transition, Spring } from "react-spring";

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
      from={{ opacity: 0, transform: "translate3d(0,-200px,0) scale(0)" }}
      to={{ opacity: 1, transform: "translate3d(0,0,0) scale(1)" }}
      delay={delay}
    >
      {props => (
        <div style={props} className="test" onClick={() => onSelected(id)} />
      )}
    </Spring>
  );
}

export default BusStopMapMarker;
