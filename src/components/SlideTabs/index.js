import React from "react";
import styles from "./slide-tabs.module.css";
import { withGesture } from "react-with-gesture";
import { Transition, animated, Spring } from "react-spring";

const Tab = ({ title, color, children }) => {
  return (
    <div style={{ background: color }} className={styles["tab-panel"]}>
      {children}
    </div>
  );
};

const TabButton = ({ title, onClick }) => {
  return (
    <button className={styles["tab-button"]} onClick={onClick}>
      {title}
    </button>
  );
};

const TabLineMarker = ({ currentIndex, count }) => {
  const linePositionSyles = {
    transform: `translateX(${100 * currentIndex}%)`,
    width: `${100 / count}%`
  };

  return (
    <div className={styles["tab-line-marker"]}>
      <span className={styles["line"]} style={linePositionSyles} />
    </div>
  );
};

class SlideTabs extends React.Component {
  static Tab = Tab;

  state = {
    currentIndex: 0,
    currentPosition: 0,
    delta: 0,
    drag: false
  };

  deltaAmount = 0;
  componentWidth = null;

  componentDidMount() {
    this.componentWidth = this.element.getBoundingClientRect().width;
    this.slidePanels = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {});
    });

    window.addEventListener("resize", () => {
      this.componentWidth = this.element.getBoundingClientRect().width;
    });
  }

  getPosition(event) {
    let pos = 0;

    if (event.targetTouches && event.targetTouches.length >= 1) {
      pos = event.targetTouches[0].clientX;
    } else {
      pos = event.clientX;
    }

    return pos;
  }

  handleTouchStart = event => {
    this.previousPosition = this.getPosition(event);
    this.startPosition = this.previousPosition;
    this.setState({
      drag: true
    });
  };

  handleTouchMove = event => {
    if (this.state.drag) {
      const { currentIndex } = this.state;

      this.currentPosition = this.getPosition(event);
      this.deltaAmount = this.currentPosition - this.previousPosition;

      if (Math.abs(this.deltaAmount) > 150) {
        if (this.deltaAmount > 0) {
          this.setState({
            drag: false,
            delta: 0,
            currentIndex: currentIndex > 0 ? currentIndex - 1 : 0
          });
        } else {
          this.setState({
            drag: false,
            delta: 0,
            currentIndex:
              currentIndex < React.Children.count(this.props.children) - 1
                ? currentIndex + 1
                : currentIndex
          });
        }
      } else {
        this.setState({
          delta: this.deltaAmount
        });
      }
    }
  };

  handleTouchEnd = event => {
    this.setState({
      drag: false,
      delta: 0
    });
  };

  handleTabButtonClick(index) {
    this.setState({
      currentIndex: index
    });
  }

  renderTabTitles() {
    return React.Children.map(this.props.children, (child, index) => {
      return (
        <TabButton
          title={child.props.title}
          onClick={() => this.handleTabButtonClick(index)}
        />
      );
    });
  }

  getCurrentPostion() {
    const width = this.componentWidth || 0;
    return -(width * this.state.currentIndex);
  }

  render() {
    const { delta } = this.state;
    const x = delta + this.getCurrentPostion();

    const to = {
      x: x
    };

    return (
      <div className={styles["tabs-container"]}>
        <nav>
          <div className={styles["tabs-header"]}>{this.renderTabTitles()}</div>
          <TabLineMarker
            currentIndex={this.state.currentIndex}
            count={React.Children.count(this.props.children)}
          />
        </nav>

        <div
          className={styles["tabs-panels-container"]}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <Spring native to={to}>
            {props => (
              <animated.div
                style={{
                  transform: props.x.interpolate(
                    x => `translate3d(${x}px, 0, 0)`
                  )
                }}
                className={styles["tabs-slide"]}
                ref={element => (this.element = element)}
              >
                {this.props.children}
              </animated.div>
            )}
          </Spring>
        </div>
      </div>
    );
  }
}

export default SlideTabs;
