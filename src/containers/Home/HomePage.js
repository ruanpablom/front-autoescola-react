import React from "react";

import { Section } from "../../components";
import { menu } from "../Routes";

const HomePage = () => (
  <div>
    <Section items={menu.filter(item => item.section === "servicos")}>
      Serviços
    </Section>
    <Section items={menu.filter(item => item.section === "cadastros")}>
      Cadastros
    </Section>
  </div>
);

export default HomePage;
