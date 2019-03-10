import React from "react";
import styles from "./slide-tabs.module.css";

const TabLineMarker = ({ currentIndex, count }) => {
  const linePositionSyles = {
    transform: `translateX(${100 * currentIndex}%)`,
    width: `${100 / count}%`
  };

  return (
    <div className={styles["tab-line-marker"]}>
      <span className={styles["line"]} style={linePositionSyles} />
    </div>
  );
};

export default TabLineMarker;
