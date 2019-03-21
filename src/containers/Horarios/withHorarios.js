import React from "react";

import HorariosContext from "./HorariosContext";

const withHorarios = Component => props => (
  <HorariosContext.Consumer>
    {context => <Component {...context} {...props} />}
  </HorariosContext.Consumer>
);

export default withHorarios;
