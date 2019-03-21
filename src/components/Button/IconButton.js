import React from "react";

import "./icon-button.scss";

const IconButton = ({ onClick, icon }) => (
  <div>
    <button className="icon-button" onClick={onClick}>
      <i className="material-icons">{icon}</i>
    </button>
  </div>
);

export default IconButton;
