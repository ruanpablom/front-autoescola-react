import React from "react";

import AlunosContext from "./AlunosContext";

const withAlunos = Component => props => (
  <AlunosContext.Consumer>
    {value => <Component {...props} {...value} />}
  </AlunosContext.Consumer>
);

export default withAlunos;
