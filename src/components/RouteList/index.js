import React from "react";
import styles from "./route-list.module.css";
import { connect } from "react-redux";
import classNames from "classnames";

const RouteListItem = React.forwardRef(({ name, isCurrent, onClick }, ref) => {
  const itemClassNames = classNames(styles.item, {
    [styles.current]: isCurrent
  });

  return (
    <li className={itemClassNames} ref={ref} onClick={onClick}>
      <span className={styles.name}>{name}</span>
    </li>
  );
});

class RouteList extends React.Component {
  selectedStopRef = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      this.selectedStopRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  }

  render() {
    const { stops, targetStop, onStopSelected } = this.props;
    return (
      <div className={styles["scroll-container"]}>
        <ul className={styles.list}>
          {stops.map(stop => {
            if (stop.name === targetStop.commonName) {
              return (
                <RouteListItem
                  key={stop.id}
                  name={stop.name}
                  isCurrent={true}
                  ref={this.selectedStopRef}
                  onClick={() => onStopSelected(stop)}
                />
              );
            } else {
              return (
                <RouteListItem
                  key={stop.id}
                  name={stop.name}
                  isCurrent={stop.name === targetStop.commonName}
                  onClick={() => onStopSelected(stop)}
                />
              );
            }
          })}
        </ul>
      </div>
    );
  }
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
