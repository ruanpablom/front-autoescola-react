import React from "react";

import {
  Header,
  DivisionBar,
  NewItem,
  Error,
  List,
  ItemEdit
} from "../../components";
import withProfessores from "./withProfessores";

const ProfessoresPage = ({
  professores,
  onAddProfessor,
  onDeleteProfessor,
  onEditProfessor,
  reloadProfessoresHasError,
  onReloadProfessoresRetry
}) => {
  if (reloadProfessoresHasError) {
    return (
      <Error
        erro={{ text: "Erro ao carregar professores" }}
        onRetry={onReloadProfessoresRetry}
      >
        Tentar Novamente
      </Error>
    );
  }
  return (
    <div>
      <Header>Professores</Header>
      <DivisionBar />
      <NewItem
        placeholderText="Digite o nome do professor"
        onAddItem={onAddProfessor}
      />
      <List
        items={professores}
        props={{ onDelete: onDeleteProfessor, onEdit: onEditProfessor }}
        ItemComponent={ItemEdit}
      />
    </div>
  );
};

export default withProfessores(ProfessoresPage);
