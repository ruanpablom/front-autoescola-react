import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./Home/HomePage";
import PageNotFound from "./PageNotFound/PageNotFound";
import AlunosPage from "./Alunos/AlunosPage";
import AulaTeoricaPage from "./AulaTeorica/AulaTeoricaPage";
import TurmaPage from "./Turmas/TurmaPage";
import ProfessoresPage from "./Professores/ProfessoresPage";
import CarrosPage from "./Carros/CarrosPage";
import AulaPraticaPage from "./AulaPratica/AulaPraticaPage";

export const menu = [
  { label: "Home", icon: "icon-home", path: "/" },
  {
    label: "Aula Teórica",
    icon: "icon-edit",
    path: "/aula-teorica",
    section: "servicos"
  },
  {
    label: "Aula Prática",
    icon: "icon-velocimeter",
    path: "/aula-pratica",
    section: "servicos"
  },
  {
    label: "Alunos",
    icon: "icon-person",
    path: "/alunos",
    section: "cadastros"
  },
  {
    label: "Professores",
    icon: "icon-eye",
    path: "/professores",
    section: "cadastros"
  },
  { label: "Carros", icon: "icon-car", path: "/carros", section: "cadastros" }
];

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/alunos" component={AlunosPage} />
    <Route exact path="/aula-teorica" component={AulaTeoricaPage} />
    <Route exact path="/turma-page" component={TurmaPage} />
    <Route exact path="/professores" component={ProfessoresPage} />
    <Route exact path="/carros" component={CarrosPage} />
    <Route exact path="/aula-pratica" component={AulaPraticaPage} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
