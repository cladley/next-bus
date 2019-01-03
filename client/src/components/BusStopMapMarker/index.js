import React from "react";

function BusStopMapMarker({ id, onSelected, isSelected }) {
  const styles = {
    backgroundColor: isSelected ? "green" : "pink",
    height: isSelected ? "20px" : "10px",
    width: isSelected ? "20px" : "10px",
    borderRadius: "50%"
  };

  return <div style={styles} className="test" onClick={() => onSelected(id)} />;
}

export default BusStopMapMarker;
