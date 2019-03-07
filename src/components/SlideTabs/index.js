import React from "react";
import { animated, Spring } from "react-spring";
import styles from "./slide-tabs.module.css";
import DragGesture from "../DragGesture";

const SlideTabTrack = React.forwardRef(
  ({ children, x, deltaX, onBoundsExceeded }, ref) => {
    console.log(Math.abs(deltaX.getValue()));
    if (Math.abs(deltaX.getValue()) > 60) {
      const direction = deltaX.getValue() < 0 ? "left" : "right";
      onBoundsExceeded(direction);
    }

    return (
      <animated.div
        style={{
          transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
        }}
        className={styles["tabs-slide"]}
        ref={ref}
      >
        {children}
      </animated.div>
    );
  }
);

const Tab = ({ title, children }) => {
  return <div className={styles["tab-panel"]}>{children}</div>;
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

class SlideTabs extends React.PureComponent {
  static Tab = Tab;

  state = {
    currentIndex: 0,
    currentPosition: 0,
    delta: 0,
    drag: false,
    suspendDragging: false
  };

  constructor(props) {
    super(props);
    this.componentWidth = null;
    this.element = React.createRef();
    this.isAnimating = false;
  }

  componentDidMount() {
    this.componentWidth = this.element.current.getBoundingClientRect().width;
    this.slidePanels = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {});
    });

    window.addEventListener("resize", () => {
      this.componentWidth = this.element.current.getBoundingClientRect().width;
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
      const deltaAmount = this.currentPosition - this.previousPosition;

      if (Math.abs(deltaAmount) > 150) {
        if (deltaAmount > 0) {
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
          delta: deltaAmount
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

  handleOnBoundsExceeded = nextIndex => {};

  goToNext(direction) {
    if (!this.isAnimating) {
      this.isAnimating = true;
      const { currentIndex } = this.state;
      let nextIndex;
      const childCount = React.Children.count(this.props.children);

      if (direction === "left") {
        nextIndex =
          currentIndex < childCount - 1 ? currentIndex + 1 : currentIndex;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      }

      this.setState({
        currentIndex: nextIndex
      });
    }
  }

  render() {
    return (
      <div className={styles["tabs-container"]}>
        <nav>
          <div className={styles["tabs-header"]}>{this.renderTabTitles()}</div>
          <TabLineMarker
            currentIndex={this.state.currentIndex}
            count={React.Children.count(this.props.children)}
          />
        </nav>

        <DragGesture>
          {({ dragProps, cancel }) => (
            <div className={styles["tabs-panels-container"]}>
              <Spring
                native
                to={{
                  x: dragProps.delta.x + this.getCurrentPostion(),
                  deltaX: dragProps.delta.x
                }}
                onRest={() => (this.isAnimating = false)}
              >
                {props => (
                  <SlideTabTrack
                    x={props.x}
                    deltaX={props.deltaX}
                    ref={this.element}
                    onBoundsExceeded={direction => {
                      cancel();
                      this.goToNext(direction);
                    }}
                  >
                    {this.props.children}
                  </SlideTabTrack>
                )}
              </Spring>
            </div>
          )}
        </DragGesture>
      </div>
    );
  }
}

export default SlideTabs;
