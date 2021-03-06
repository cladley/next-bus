import React from "react";
import { Transition, animated, Spring } from "react-spring";
import PropTypes from "prop-types";
import DragGesture from "../DragGesture";
import classNames from "classnames";
import styles from "./panel.module.css";
import { ReactComponent as DetailsIcon } from "../../icons/details.svg";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";

export const appearances = {
  short: "short",
  half: "half",
  full: "full",
  closed: "closed"
};

const Half = ({ children, closePanel, expandPanel }) => {
  return (
    <React.Fragment>
      {children}
      <button className={styles["button-expand"]} onClick={expandPanel}>
        <DetailsIcon />
      </button>
      <button className={styles["button-close"]} onClick={closePanel}>
        <CloseIcon />
      </button>
    </React.Fragment>
  );
};

const Full = ({ children, closePanel, ...props }) => {
  return (
    <div {...props}>
      {children}
      <button
        onClick={closePanel}
        style={{ position: "absolute", right: "0", top: "0" }}
      >
        clse
      </button>
    </div>
  );
};

const SHORT_HEIGHT = 85;

class Panel extends React.Component {
  static Half = Half;
  static Full = Full;

  constructor(props) {
    super(props);
    this.panelContainerRef = React.createRef();
    this.panelHeight = null;
  }

  componentDidMount() {
    this.height = this.frameElement.getBoundingClientRect().height;
  }

  componentDidUpdate() {
    const { isOpen } = this.props;

    if (isOpen === appearances.short && !this.panelHeight) {
      this.panelHeight = this.panelContainerRef.current.getBoundingClientRect().height;
    }
  }

  getTransformValuesToFullScreen() {
    const { width, height } = this.frameElement.getBoundingClientRect();
    const widthDiff = window.innerWidth - width;
    const heightDiff = window.innerHeight - height;
    const scaleX = 1 + widthDiff / width;
    const scaleY = 1 + heightDiff / height;
    return { scaleX, scaleY };
  }

  getFrameStyle() {
    const frameStyles = {};
    const { isOpen } = this.props;

    if (isOpen === appearances.short) {
    } else if (isOpen === appearances.full) {
      const { scaleX, scaleY } = this.getTransformValuesToFullScreen();
      frameStyles.transform = `scale(${scaleX}, ${scaleY})`;
    }

    return frameStyles;
  }

  getPanelClasses() {
    const { isOpen } = this.props;
    let className = "";
    if (isOpen === appearances.short) {
      className = styles.short;
    } else if (isOpen === appearances.half) {
      className = styles.half;
    } else if (isOpen === appearances.full) {
      className = styles.full;
    } else {
      className = styles.closed;
    }
    return classNames(styles.panel, className);
  }

  closePanel = (to, from) => {
    this.props.onChangeOpen(to, from);
  };

  expandPanel = () => {
    this.props.onChangeOpen(appearances.half);
  };

  getHalfPanelLeaveTransition() {
    const { isOpen } = this.props;
    if (isOpen === appearances.full) {
      return {
        opacity: 0
      };
    } else {
      return {
        opacity: 0,
        transform: "translate3d(0, 100%, 0)"
      };
    }
  }

  getPanelChildren(yDelta, down) {
    const { isOpen } = this.props;

    return React.Children.map(this.props.children, child => {
      if (child.type.name === "Half") {
        return (
          <Transition
            native
            items={isOpen === appearances.short || isOpen === appearances.half}
            from={{ opacity: 0, transform: "translate3d(0, 70px, 0)" }}
            enter={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
            leave={this.getHalfPanelLeaveTransition()}
          >
            {show =>
              show &&
              (props => (
                <animated.div
                  className={styles["component-container"]}
                  style={props}
                >
                  {React.cloneElement(child, {
                    closePanel: () =>
                      this.closePanel(appearances.closed, appearances.half),
                    expandPanel: () => this.expandPanel()
                  })}
                </animated.div>
              ))
            }
          </Transition>
        );
      } else if (child.type.name === "Full") {
        return (
          <Transition
            native
            items={isOpen === appearances.full}
            from={{ opacity: 0, transform: "translate3d(100%, 0, 0)" }}
            enter={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
            leave={{ opacity: 0 }}
          >
            {show =>
              show &&
              (props => (
                <animated.div
                  className={styles["component-container-full"]}
                  style={props}
                >
                  {React.cloneElement(child, {
                    closePanel: () => {
                      this.closePanel(appearances.half, appearances.full);
                    }
                  })}
                </animated.div>
              ))
            }
          </Transition>
        );
      }
      return "";
    });
  }

  getCurrentYPos(y) {
    const { isOpen } = this.props;
    if (isOpen === appearances.short) {
      return y - SHORT_HEIGHT;
    } else {
      return Math.max(y - this.height, -this.panelHeight);
    }
  }

  render() {
    const { isOpen } = this.props;
    const frameStyles = this.getFrameStyle();
    const panelClassNames = this.getPanelClasses();

    return (
      <DragGesture targetAttribute="data-drag-handle">
        {({ dragProps, cancel }) => {
          if (isOpen === appearances.short) {
            if (Math.abs(dragProps.delta.y) > 100) {
              cancel();
              this.props.onChangeOpen(appearances.half);
            }
          } else if (isOpen === appearances.half) {
            if (Math.abs(dragProps.delta.y > 100)) {
              cancel();
              this.props.onChangeOpen(appearances.closed);
            }
          } else if (isOpen === appearances.full) {
            cancel();
          }

          return (
            <Spring
              native
              to={{ y: dragProps.delta.y }}
              config={{ tension: 0, friction: 2, precision: 0.4 }}
            >
              {props => (
                <animated.div
                  ref={this.panelContainerRef}
                  style={{
                    transform: dragProps.down
                      ? props.y.interpolate(
                          y => `translate3d(0, ${this.getCurrentYPos(y)}px, 0)`
                        )
                      : "",
                    transition: dragProps.down ? "none" : ""
                  }}
                  className={panelClassNames}
                >
                  <div
                    className={styles.frame}
                    ref={element => (this.frameElement = element)}
                    style={frameStyles}
                  />
                  <div>{this.getPanelChildren()}</div>
                </animated.div>
              )}
            </Spring>
          );
        }}
      </DragGesture>
    );
  }
}

Panel.propTypes = {
  isOpen: PropTypes.oneOf(Object.keys(appearances))
};

export default Panel;
