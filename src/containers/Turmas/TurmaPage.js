import React from "react";
import { withRouter } from "react-router-dom";

import {
  Header,
  Error,
  DivisionBar,
  List,
  ItemAlunoTurma
} from "../../components";
import withTurmas from "./withTurmas";

const TurmaPage = props => {
  const {
    onTurmaName,
    history,
    onTurmaAlunosPossible,
    onAddTurmaAluno,
    onRemoveTurmaAluno,
    reloadTurmasHasError,
    onReloadTurmasRetry
  } = props;
  const turmaId = props.location.aboutProps;
  const alunosPossible = onTurmaAlunosPossible(turmaId);

  if (!turmaId) {
    return (
      <Error
        onRetry={() => {
          history.push("/aula-teorica");
        }}
        erro={{ text: "Não foi possivel recarregar a página da turma." }}
      >
        Aula Teórica
      </Error>
    );
  }
  return (
    <div>
      {reloadTurmasHasError ? (
        <Error
          onRetry={() => {
            onReloadTurmasRetry();
          }}
          erro={{ text: "Erro ao carregar turmas" }}
        >
          Tentar Novamente
        </Error>
      ) : (
        <div>
          <Header>{onTurmaName(turmaId)}</Header>
          <DivisionBar />
          {alunosPossible.length > 0 ? (
            <List
              items={alunosPossible}
              ItemComponent={ItemAlunoTurma}
              props={{
                turmaId,
                onAddAluno: onAddTurmaAluno,
                onRemoveAluno: onRemoveTurmaAluno
              }}
            />
          ) : (
            <Error
              onRetry={() => {
                history.push("/alunos");
              }}
              erro={{ text: "Não existem alunos disponiveis" }}
            >
              Cadastrar Aluno
            </Error>
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(withTurmas(TurmaPage));
