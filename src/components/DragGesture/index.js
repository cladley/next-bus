import React from "react";

class DragGesture extends React.Component {
  state = {
    isDragging: false,
    delta: {
      x: 0,
      y: 0
    }
  };

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
    this.element.addEventListener("touchmove", this.handleTouchMove);
    this.element.addEventListener("touchend", this.handleTouchEnd);
  };

  handleTouchMove = event => {
    console.log("MOUSE MVE CALLLED");
    var currentPosition = this.getPosition(event);
    const deltaX = currentPosition.x - this.startPosition.x;
    const deltaY = currentPosition.y - this.startPosition.y;

    this.setState({
      isDragging: true,
      delta: {
        x: deltaX,
        y: deltaY
      }
    });
  };

  handleTouchEnd = event => {
    this.setState({
      isDragging: false,
      delta: { x: 0, y: 0 }
    });
  };

  cancel = () => {
    this.element.removeEventListener("touchmove", this.handleTouchMove);
    this.element.removeEventListener("touchend", this.handleTouchEnd);

    if (this.state.delta.x !== 0 && this.state.delta.y !== 0) {
      this.setState({
        delta: { x: 0, y: 0 }
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
