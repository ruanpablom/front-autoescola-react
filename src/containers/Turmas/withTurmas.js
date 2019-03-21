import React from "react";
import TurmasContext from "./TurmasContext";

const withTurmas = Component => props => (
  <TurmasContext.Consumer>
    {context => <Component {...props} {...context} />}
  </TurmasContext.Consumer>
);

export default withTurmas;
