import React from "react";

function BusStopMapMarker() {
  const styles = {
    backgroundColor: "pink",
    height: "6px",
    width: "6px",
    borderRadius: "50%"
  };

  return <div style={styles} className="test" onClick={() => alert("he")} />;
}

export default BusStopMapMarker;
