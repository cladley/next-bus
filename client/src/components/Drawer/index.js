import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import eventPromise from "../../utilities/eventPromise";
import Container from "../Layout/Container";
import styles from "./drawer.module.css";

class Drawer extends Component {
  static defaultProps = {
    isOpen: false,
    hasBackdrop: false,
    closeOnBackdropClick: false
  };

  constructor(props) {
    super(props);
    this.drawerElement = React.createRef();
    this.previousPosition = 0;
    this.currentPosition = 0;
    this.deltaAmount = 0;
    this.isDragging = false;
  }

  handleClickOnBackdrop = () => {
    this.props.closeDrawer();
  };

  getPosition(event) {
    let pos = 0;

    if (event.targetTouches && event.targetTouches.length >= 1) {
      pos = event.targetTouches[0].clientY;
    } else {
      pos = event.clientY;
    }

    return pos;
  }

  handleTouchStart = event => {
    this.previousPosition = this.getPosition(event);
    this.isDragging = true;
  };

  handleTouchEnd = event => {
    const domElement = this.drawerElement.current;
    this.isDragging = false;
    domElement.style.transition = "transform .2s ease";

    if (Math.abs(this.deltaAmount) > 100) {
      eventPromise(domElement, "transitionend").then(() => {
        this.props.onDrawerClosed();

        // TODO: Think of better way to do this
        setTimeout(() => {
          domElement.style.transform = "";
          domElement.style.transition = "";
        }, 400);
      });

      this.moveDrawer(-window.innerHeight);
    } else {
      eventPromise(domElement, "transitionend").then(() => {
        domElement.style.transition = "";
      });

      this.moveDrawer(0);
    }

    this.deltaAmount = 0;
  };

  handleTouchMove = event => {
    if (this.isDragging) {
      this.currentPosition = this.getPosition(event);
      this.deltaAmount = this.previousPosition - this.currentPosition;

      if (this.deltaAmount < -2) {
        this.moveDrawer(this.deltaAmount);
      }
    }
  };

  moveDrawer(amount) {
    this.drawerElement.current.style.transform = `translate3d(0, ${-amount}px, 0)`;
  }

  render() {
    const { isOpen, closeOnBackdropClick, hasBackdrop } = this.props;

    let drawerClassNames = classNames(styles.drawer, {
      [styles.active]: isOpen
    });

    return (
      <div className={drawerClassNames} ref={this.drawerElement}>
        {hasBackdrop && (
          <div
            className={styles.backdrop}
            onClick={closeOnBackdropClick ? this.handleClickOnBackdrop : null}
          />
        )}
        <div className={styles["component-panel"]}>
          <div
            className={styles.handle}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            onTouchMove={this.handleTouchMove}
          />
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
