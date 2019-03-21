import React from "react";

import "./list-item.scss";
import Button from "../Button/Button";

const SelectItemCarro = ({ item, onSelect, onCarroProfessorName }) => (
  <div className="list-item__container">
    <div className="list-item__text__container">
      <span>{item.text}</span>
      <span>{onCarroProfessorName(item.id)}</span>
    </div>
    <Button
      buttonType="button--stroke"
      style={{ marginLeft: "auto" }}
      onClick={() => {
        onSelect(item.id);
      }}
    >
      Selecionar
    </Button>
  </div>
);

export default SelectItemCarro;
