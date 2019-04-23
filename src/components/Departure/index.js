import React from "react";
import styles from "./departure.module.css";

const Departure = ({ line, destination, departures }) => {
  const calculateArrivalTime = time => {
    const arrivalTime = new Date(time);
    const diff = arrivalTime - new Date();
    return Math.floor(diff / 1000 / 60);
  };

  const getNextTimes = departures => {
    return (
      departures
        .map(departure => {
          return calculateArrivalTime(departure.arrival);
        })
        .join(", ") + " mins"
    );
  };

  const orderedDepartures = departures.sort((bus1, bus2) => {
    const d1 = new Date(bus1.arrival);
    const d2 = new Date(bus2.arrival);
    return d1 - d2;
  });

  let nextTime = calculateArrivalTime(orderedDepartures[0].arrival);
  nextTime = nextTime <= 0 ? "due" : nextTime;
  const nextBusDestination = orderedDepartures[0].destination;
  const afterNextTimes = getNextTimes(orderedDepartures.slice(1));

  return (
    <div className={styles.container}>
      <div className={styles["bus-details"]}>
        <h3>{line}</h3>
        <p>{nextBusDestination}</p>
      </div>
      <div className={styles["bus-times"]}>
        <span className={styles.next}>
          {nextTime}
          {nextTime !== "due" && <span className={styles.mins}>mins</span>}
        </span>
        <span className={styles.after}>then {afterNextTimes}</span>
      </div>
    </div>
  );
};

export default Departure;
