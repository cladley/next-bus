import React from "react";
import styles from "./layout.module.css";

class Container extends React.PureComponent {
  render() {
    return <div className={styles.container}>{this.props.children}</div>;
  }
}

export default Container;
