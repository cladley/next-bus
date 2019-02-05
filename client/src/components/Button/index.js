import React from "react";
import classNames from "classnames";
import "./button.css";

class Button extends React.Component {
  render() {
    const { circular } = this.props;
    const buttonClassNames = classNames("button", { circular: circular });
    return <button className={buttonClassNames}>{this.props.children}</button>;
  }
}

export default Button;
