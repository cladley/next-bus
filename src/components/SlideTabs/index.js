import React from "react";
import { Spring } from "react-spring";
import styles from "./slide-tabs.module.css";
import SlideTabTrack from "./SlideTabsTrack";
import TabLineMarker from "./TabLineMarker";
import DragGesture from "../DragGesture";

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

    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize = () => {
    if (this.element) {
      this.componentWidth = this.element.current.getBoundingClientRect().width;
    }
  };

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

  handleOnBoundsExceeded = direction => {
    const { currentIndex } = this.state;
    const childCount = React.Children.count(this.props.children);
    let nextIndex;

    if (direction === "left") {
      nextIndex =
        currentIndex < childCount - 1 ? currentIndex + 1 : currentIndex;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    }

    this.setState({
      currentIndex: nextIndex
    });
  };

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
                  x: dragProps.down
                    ? dragProps.delta.x + this.getCurrentPostion()
                    : this.getCurrentPostion(),
                  deltaX: dragProps.delta.x
                }}
              >
                {props => (
                  <SlideTabTrack
                    x={props.x}
                    deltaX={props.deltaX}
                    velocity={dragProps.velocity}
                    down={dragProps.down}
                    ref={this.element}
                    onBoundsExceeded={direction => {
                      cancel();
                      this.handleOnBoundsExceeded(direction);
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
