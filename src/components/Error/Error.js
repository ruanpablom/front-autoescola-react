import React from "react";

import "./error.scss";

const Error = ({ onRetry, erro, children }) => (
  <div className="error">
    <h1>Ops!</h1>
    <p>{erro.text}</p>
    <button className="error__button" onClick={onRetry}>
      {children}
    </button>
  </div>
);

export default Error;
