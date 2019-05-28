import React from "react";
import styles from "./route-list.module.css";
import {connect} from 'react-redux';
import classNames from "classnames";


const RouteListItem = React.forwardRef(({name, isCurrent}, ref) => {

  const itemClassNames = classNames(styles.item, {
    [styles.current]: isCurrent
  });
  
  return (
    <li className={itemClassNames} ref={ref}>
      <span className={styles.name}>{name}</span>
    </li>
  );
});


class RouteList extends React.Component {
  selectedStopRef = React.createRef();

  componentDidMount() {
    this.selectedStopRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  }
  
  render() {
    const { stops, selectedStop } = this.props;
    return (
      <div className={styles["scroll-container"]}>
        <ul className={styles.list}>
          {stops.map(stop => {
            if (stop.name === selectedStop.commonName) {
              return <RouteListItem key={stop.id} name={stop.name} isCurrent={true} ref={this.selectedStopRef} />
            } else {
              return <RouteListItem key={stop.id} name={stop.name} isCurrent={stop.name === selectedStop.commonName} />
            }
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({map, stops}) => {
  return {
    selectedStop: stops.byNaptanId[map.selectedStopId]
  };
};

export default connect(mapStateToProps, null)(RouteList);
