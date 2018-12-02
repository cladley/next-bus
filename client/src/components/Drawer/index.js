import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./drawer.module.css";
import classNames from "classnames";

class Drawer extends Component {
  static defaultProps = {
    isOpen: false,
    closeOnBackdropClick: false
  };

  handleClickOnBackdrop = () => {
    this.props.closeDrawer();
  };

  render() {
    const { isOpen, closeOnBackdropClick } = this.props;

    let drawerClassNames = classNames(styles.drawer, {
      [styles.active]: isOpen
    });

    return (
      <div className={drawerClassNames}>
        <div
          className={styles.backdrop}
          onClick={closeOnBackdropClick ? this.handleClickOnBackdrop : null}
        />
        <div className={styles["component-panel"]}>{this.props.children}</div>
      </div>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeOnBackdropClick: PropTypes.bool
};

export default Drawer;
