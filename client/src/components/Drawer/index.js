import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Container from "../Layout/Container";
import styles from "./drawer.module.css";

class Drawer extends Component {
  static defaultProps = {
    isOpen: false,
    hasBackdrop: false,
    closeOnBackdropClick: false
  };

  handleClickOnBackdrop = () => {
    this.props.closeDrawer();
  };

  render() {
    const { isOpen, closeOnBackdropClick, hasBackdrop } = this.props;

    let drawerClassNames = classNames(styles.drawer, {
      [styles.active]: isOpen
    });

    return (
      <div className={drawerClassNames}>
        {hasBackdrop && (
          <div
            className={styles.backdrop}
            onClick={closeOnBackdropClick ? this.handleClickOnBackdrop : null}
          />
        )}
        <div className={styles["component-panel"]}>
          <Container>{this.props.children}</Container>
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeOnBackdropClick: PropTypes.bool,
  hasBackdrop: PropTypes.bool
};

export default Drawer;
