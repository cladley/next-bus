import React from "react";
import { Transition, animated } from "react-spring";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./panel.module.css";

export const appearances = {
  half: "half",
  full: "full",
  closed: "closed"
};

const Half = ({ children, closePanel }) => {
  return (
    <div>
      {children}
      <button onClick={closePanel}>close</button>
    </div>
  );
};

const Full = ({ children, closePanel, ...props }) => {
  return (
    <div {...props}>
      {children}
      <button onClick={closePanel}>close</button>
    </div>
  );
};

class Panel extends React.Component {
  static Half = Half;
  static Full = Full;

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
    if (isOpen === appearances.full) {
      const { scaleX, scaleY } = this.getTransformValuesToFullScreen();
      frameStyles.transform = `scale(${scaleX}, ${scaleY})`;
    }

    return frameStyles;
  }

  getPanelClasses() {
    const { isOpen } = this.props;
    let className = "";
    if (isOpen === appearances.half) {
      className = styles.half;
    } else if (isOpen === appearances.full) {
      className = styles.full;
    } else {
      className = styles.closed;
    }
    return classNames(styles.panel, className);
  }

  closePanel = type => {
    this.props.onChangeOpen(type);
  };

  getPanelChildren() {
    const { isOpen } = this.props;

    return React.Children.map(this.props.children, child => {
      if (child.type.name === "Half") {
        return (
          <Transition
            native
            items={isOpen === appearances.half}
            from={{ opacity: 0, transform: "translate3d(0, 100%, 0)" }}
            enter={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
            leave={{ opacity: 0 }}
          >
            {show =>
              show &&
              (props => (
                <animated.div
                  className={styles["component-container"]}
                  style={props}
                >
                  {React.cloneElement(child, {
                    closePanel: () => this.closePanel("half")
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
                    closePanel: () => this.closePanel("full")
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

  render() {
    const frameStyles = this.getFrameStyle();
    const panelClassNames = this.getPanelClasses();
    const children = this.getPanelChildren();

    return (
      <div className={panelClassNames}>
        <div
          className={styles.frame}
          ref={element => (this.frameElement = element)}
          style={frameStyles}
        />

        <div>{children}</div>
      </div>
    );
  }
}

Panel.propTypes = {
  isOpen: PropTypes.oneOf(Object.keys(appearances))
};

export default Panel;
