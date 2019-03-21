import React from "react";

import {
  Header,
  DivisionBar,
  NewAulaPratica,
  Error,
  List,
  ItemAlunoAulaPratica
} from "../../components";
import withAulaPratica from "./withAulaPratica";

const AulaPraticaPage = ({
  alunos,
  onAlunoName,
  wasReloadedAlunos,
  onReloadAlunosRetry,
  carros,
  onCarroName,
  wasReloadedCarros,
  onReloadCarrosRetry,
  onCarroProfessorName,
  horarios,
  onHorarioText,
  alunosAulas,
  onRemoveAulaPratica,
  onAddAulaPratica,
  onAulaCarroId,
  onQtdAulasAluno,
  onAlunoCarroId,
  onAulaHorarioId
}) => (
  <div>
    {wasReloadedCarros && wasReloadedAlunos ? (
      <React.Fragment>
        <Header>Aula Prática</Header>
        <DivisionBar />
        <NewAulaPratica
          onAddItem={onAddAulaPratica}
          alunos={alunos}
          carros={carros}
          horarios={horarios}
          onAlunoName={onAlunoName}
          onCarroName={onCarroName}
          onHorarioText={onHorarioText}
          onCarroProfessorName={onCarroProfessorName}
          onAlunoCarroId={onAlunoCarroId}
          onQtdAulasAluno={onQtdAulasAluno}
        />
        <div style={{ marginTop: "40px" }} />
        <List
          items={alunosAulas}
          ItemComponent={ItemAlunoAulaPratica}
          props={{
            onAlunoName,
            onAulaCarroId,
            onCarroName,
            onQtdAulasAluno,
            onAulaHorarioId,
            onHorarioText,
            onRemoveAulaPratica
          }}
        />
      </React.Fragment>
    ) : (
      <div>
        {!wasReloadedCarros && (
          <Error
            onRetry={onReloadCarrosRetry}
            erro={{ text: "Erro ao carregar os carros" }}
          >
            Tentar Novamente
          </Error>
        )}
        {!wasReloadedAlunos && (
          <Error
            onRetry={onReloadAlunosRetry}
            erro={{ text: "Erro ao carregar os alunos" }}
          >
            Tentar Novamente
          </Error>
        )}
      </div>
    )}
  </div>
);

export default withAulaPratica(AulaPraticaPage);
