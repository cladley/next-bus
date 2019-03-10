import React from "react";
import { clamp } from "lodash";

class DragGesture extends React.PureComponent {
  state = {
    down: false,
    delta: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    }
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }

  getPosition(event) {
    let x;
    let y;

    if (event.targetTouches && event.targetTouches.length >= 1) {
      x = event.targetTouches[0].clientX;
      y = event.targetTouches[0].clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    return { x, y };
  }

  handleTouchStart = event => {
    this.startPosition = this.getPosition(event);
    this.prevPosition = this.startPosition;
    this.element.addEventListener("touchmove", this.handleTouchMove);
    this.element.addEventListener("touchend", this.handleTouchEnd);
  };

  handleTouchMove = event => {
    var currentPosition = this.getPosition(event);
    const deltaX = currentPosition.x - this.startPosition.x;
    const deltaY = currentPosition.y - this.startPosition.y;

    const velocityVector = {
      x: 0,
      y: 0
    };

    velocityVector.x = this.prevPosition.x - currentPosition.x;
    velocityVector.y = this.prevPosition.y - currentPosition.y;

    this.prevPosition = currentPosition;

    var unitVelocity = this.normalizeVector(velocityVector);
    var speed = this.getLengthOfVector(velocityVector);
    speed = this.calculateSpeed(speed);

    var velocity = {
      x: unitVelocity.x * speed,
      y: unitVelocity.y * speed
    };

    this.setState({
      down: true,
      delta: {
        x: deltaX,
        y: deltaY
      },
      velocity
    });
  };

  getLengthOfVector = vector => {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return length;
  };

  normalizeVector = vector => {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    const newVector = {
      x: vector.x / length,
      y: vector.y / length
    };

    return newVector;
  };

  calculateSpeed = speed => {
    var accel_threshold = 1000;
    var accel_limit = 2000;
    var accel_factor = 1.5;
    var speed_limit = 2000;

    speed = Math.min(speed, speed_limit);

    var accel_range =
      clamp(speed, accel_threshold, accel_limit) /
      (accel_limit - accel_threshold);
    var accel = accel_range * accel_factor;
    speed = speed * accel;

    return speed;
  };

  handleTouchEnd = event => {
    this.setState({
      down: false,
      delta: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 }
    });
  };

  cancel = () => {
    this.element.removeEventListener("touchmove", this.handleTouchMove);
    this.element.removeEventListener("touchend", this.handleTouchEnd);

    if (this.state.delta.x !== 0 && this.state.delta.y !== 0) {
      this.setState({
        delta: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        down: false
      });
    }
  };

  render() {
    return (
      <div
        onTouchStart={this.handleTouchStart}
        ref={element => (this.element = element)}
      >
        {this.props.children({ dragProps: this.state, cancel: this.cancel })}
      </div>
    );
  }
}

export default DragGesture;
