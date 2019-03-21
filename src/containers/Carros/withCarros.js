import React from "react";

import CarrosContext from "./CarrosContext";

const withCarros = Component => props => (
  <CarrosContext.Consumer>
    {context => <Component {...props} {...context} />}
  </CarrosContext.Consumer>
);

export default withCarros;
