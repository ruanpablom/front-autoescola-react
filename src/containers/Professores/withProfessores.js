import React from "react";

import ProfessoresContext from "./ProfessoresContext";

const withProfessores = Component => props => (
  <ProfessoresContext.Consumer>
    {context => <Component {...props} {...context} />}
  </ProfessoresContext.Consumer>
);

export default withProfessores;
