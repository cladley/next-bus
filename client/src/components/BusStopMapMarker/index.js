import React from "react";

function BusStopMapMarker() {
  const styles = {
    backgroundColor: "pink",
    height: "30px",
    width: "30px",
    borderRadius: "50%"
  };

  return <div style={styles} className="test" onClick={() => alert("he")} />;
}

export default BusStopMapMarker;
