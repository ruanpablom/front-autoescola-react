import React from "react";

import withAlunos from "./withAlunos";
import {
  NewItem,
  Header,
  DivisionBar,
  List,
  Error,
  ItemEdit
} from "../../components";

const AlunosPage = ({
  alunos,
  onAddAluno,
  onEditAluno,
  onDeleteAluno,
  reloadAlunosHasError,
  onReloadAlunosRetry
}) => {
  if (reloadAlunosHasError) {
    return (
      <Error
        onRetry={onReloadAlunosRetry}
        erro={{ text: "Erro ao carregar alunos" }}
      >
        Tentar Novamente
      </Error>
    );
  }
  return (
    <div>
      <Header>Alunos</Header>
      <DivisionBar />
      <NewItem
        placeholderText="Digite o nome do aluno."
        onAddItem={onAddAluno}
      />
      <List
        items={alunos}
        ItemComponent={ItemEdit}
        props={{ onDelete: onDeleteAluno, onEdit: onEditAluno }}
      />
    </div>
  );
};

export default withAlunos(AlunosPage);
