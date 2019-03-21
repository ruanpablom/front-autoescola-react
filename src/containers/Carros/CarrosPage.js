import React from "react";
import { withRouter } from "react-router";

import {
  Header,
  DivisionBar,
  NewItem,
  Error,
  List,
  ItemCarro
} from "../../components";
import withCarros from "./withCarros";

const CarrosPage = ({
  carros,
  professores,
  onAddCarro,
  onEditCarro,
  onRemoveCarro,
  onAddProfessorCarro,
  onCarroProfessorName,
  wasReloadedCarros,
  onReloadCarrosRetry
}) => (
  <div>
    {wasReloadedCarros ? (
      <div>
        <Header>Carros</Header>
        <DivisionBar />
        <NewItem placeholderText="Qual carro?" onAddItem={onAddCarro} />
        <List
          items={carros}
          props={{
            onDelete: onRemoveCarro,
            onEdit: onEditCarro,
            onAddProfessorCarro,
            onCarroProfessorName,
            professores
          }}
          ItemComponent={ItemCarro}
        />
      </div>
    ) : (
      <Error
        onRetry={onReloadCarrosRetry}
        erro={{ text: "Erro ao carregar os carros" }}
      >
        Recarregar Carros
      </Error>
    )}
  </div>
);

export default withRouter(withCarros(CarrosPage));
