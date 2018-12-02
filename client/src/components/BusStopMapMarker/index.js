import React from "react";

function BusStopMapMarker({ id, onSelected }) {
  const styles = {
    backgroundColor: "pink",
    height: "10px",
    width: "10px",
    borderRadius: "50%"
  };

  return <div style={styles} className="test" onClick={() => onSelected(id)} />;
}

export default BusStopMapMarker;
