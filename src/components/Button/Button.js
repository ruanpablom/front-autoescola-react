import React from "react";
import classNames from "classnames";

import "./button.scss";

const Button = ({ children, onClick, style, buttonType, disabled }) => (
  <button
    className={classNames("button", buttonType)}
    disabled={disabled}
    style={style}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
