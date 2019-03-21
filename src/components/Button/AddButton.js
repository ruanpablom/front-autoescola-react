import React from "react";
import classNames from "classnames";

import "./button.scss";

const AddButton = ({ onClick, isClose }) => (
  <div className="add-button__container">
    <button
      className={classNames("add-button", {
        "add-button--close": isClose
      })}
      onClick={onClick}
    >
      <i className="material-icons">add_circle_outline</i>
    </button>
  </div>
);

export default AddButton;
