import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes, { menu } from "../Routes";
import PageLayout from "../PageLayout/PageLayout";
import "../../assets/fontello-icons/css/fontello.css";
import AlunosProvider from "../Alunos/AlunosProvider";
import TurmasProvider from "../Turmas/TurmasProvider";
import ProfessoresProvider from "../Professores/ProfessoresProvider";
import CarrosProvider from "../Carros/CarrosProvider";
import HorariosProvider from "../Horarios/HorariosProvider";
import AulaPraticaProvider from "../AulaPratica/AulaPraticaProvider";

const App = () => (
  <Router>
    <AlunosProvider>
      <TurmasProvider>
        <ProfessoresProvider>
          <CarrosProvider>
            <HorariosProvider>
              <AulaPraticaProvider>
                <PageLayout menu={menu}>
                  <Routes />
                </PageLayout>
              </AulaPraticaProvider>
            </HorariosProvider>
          </CarrosProvider>
        </ProfessoresProvider>
      </TurmasProvider>
    </AlunosProvider>
  </Router>
);

export default App;
