import React from "react";
import styles from "./route-list.module.css";
import { connect } from "react-redux";
import classNames from "classnames";

const RouteListItem = React.forwardRef(
  ({ name, isCurrent, isSelected, onClick }, ref) => {
    const itemClassNames = classNames(styles.item, {
      [styles.current]: isCurrent,
      [styles.selected]: isSelected
    });

    return (
      <li className={itemClassNames} ref={ref} onClick={onClick}>
        <span className={styles.name}>{name}</span>
      </li>
    );
  }
);

function RouteList({
  stops,
  targetStop,
  selectedStop,
  shouldListItemScrollIntoView,
  onStopSelected
}) {
  let targetStopRef = React.useRef(null);
  let selectedStopRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      targetStopRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  }, []);

  React.useEffect(() => {
    if (selectedStopRef.current && shouldListItemScrollIntoView) {
      selectedStopRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [selectedStopRef.current]);

  return (
    <div className={styles["scroll-container"]}>
      <ul className={styles.list}>
        {stops.map(stop => {
          const isCurrent = stop.name === targetStop.commonName;
          const isSelected = selectedStop && selectedStop.name === stop.name;

          return (
            <RouteListItem
              key={stop.id}
              name={stop.name}
              isCurrent={isCurrent}
              isSelected={isSelected}
              ref={element => {
                if (isCurrent) {
                  targetStopRef.current = element;
                } else if (isSelected) {
                  selectedStopRef.current = element;
                }
              }}
              onClick={() => onStopSelected(stop, false)}
            />
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = ({ map, stops }) => {
  return {
    targetStop: stops.byNaptanId[map.selectedStopId]
  };
};

export default connect(
  mapStateToProps,
  null
)(RouteList);
