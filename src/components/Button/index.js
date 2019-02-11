import React from "react";
import classNames from "classnames";
import "./button.css";

class Button extends React.Component {
  render() {
    const { circular, className, onClick } = this.props;
    const buttonClassNames = classNames("button", className, {
      circular: circular
    });
    return (
      <button className={buttonClassNames} onClick={onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
