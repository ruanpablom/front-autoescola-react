import React from "react";

import "./list-item.scss";
import Button from "../Button/Button";

const SelectItemAluno = ({ item, onSelect, onQtdAulasAluno }) => (
  <div className="list-item__container">
    <div className="list-item__text__container">
      <span>{item.text}</span>
      <span>Aulas:{onQtdAulasAluno(item.id)}</span>
    </div>
    <Button
      buttonType="button--stroke"
      disabled={onQtdAulasAluno(item.id) >= 10}
      style={{ marginLeft: "auto" }}
      onClick={() => {
        onSelect(item.id);
      }}
    >
      Selecionar
    </Button>
  </div>
);

export default SelectItemAluno;
