import React from "react";

import "./list-item.scss";
import Button from "../Button/Button";

const ItemAlunoTurma = ({ item, turmaId, onAddAluno, onRemoveAluno }) => (
  <div className="list-item__container">
    <span>{item.text}</span>
    {turmaId === item.turma ? (
      <React.Fragment>
        <span>
          <i className="material-icons">check</i>
        </span>
        <Button
          buttonType="button--stroke"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            onRemoveAluno(item.id, turmaId);
          }}
        >
          Excluir Aluno
        </Button>
      </React.Fragment>
    ) : (
      <Button
        buttonType="button--stroke"
        style={{ marginLeft: "auto" }}
        onClick={() => {
          onAddAluno(item.id, turmaId);
        }}
      >
        Incluir Aluno
      </Button>
    )}
  </div>
);

export default ItemAlunoTurma;
