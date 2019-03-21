import React from "react";

import Travolta from "../../images/travolta.gif";
import { Header, ButtonLink, Center } from "../../components/";

const PageNotFound = () => (
  <Center>
    <Header>Ops!</Header>
    <div>
      <img src={Travolta} alt="Travolta" width="200" />
    </div>
    <ButtonLink to="/">Voltar para o ínicio</ButtonLink>
  </Center>
);

export default PageNotFound;
