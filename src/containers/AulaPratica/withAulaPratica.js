import React from "react";

import AulaPraticaContext from "./AulaPraticaContext";

const withAulaPratica = Component => props => (
  <AulaPraticaContext.Consumer>
    {context => <Component {...props} {...context} />}
  </AulaPraticaContext.Consumer>
);

export default withAulaPratica;
