import React from "react";

import {
  DivisionBar,
  Header,
  NewItem,
  List,
  ItemTurma,
  Error
} from "../../components";
import withTurmas from "../Turmas/withTurmas";

const AulaTeoricaPage = ({
  onAddTurma,
  turmas,
  onDeleteTurma,
  onEditTurmaTitle,
  onQtdAlunosTurma,
  reloadTurmasHasError,
  onReloadTurmasRetry
}) => {
  return (
    <div>
      <Header>Aula Teórica</Header>
      <DivisionBar />
      {reloadTurmasHasError ? (
        <Error
          onRetry={onReloadTurmasRetry}
          erro={{ text: "Erro ao carregar turmas" }}
        >
          Tentar Novamente
        </Error>
      ) : (
        <div>
          <NewItem
            onAddItem={onAddTurma}
            placeholderText="Digite o nome da turma."
          />
          <List
            items={turmas}
            ItemComponent={ItemTurma}
            props={{
              onDelete: onDeleteTurma,
              onEdit: onEditTurmaTitle,
              onQtdAlunosTurma
            }}
          />
        </div>
      )}
    </div>
  );
};
export default withTurmas(AulaTeoricaPage);
