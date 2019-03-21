import React from "react";

import Button from "../Button/Button";

const ItemSelectProfessorCarro = ({ item, carroId, onSelect, closeList }) => (
  <div className="list-item__container">
    <div className="list-item__text__container">
      <span className="list-item__text">{item.text}</span>
    </div>
    <Button
      onClick={() => {
        onSelect(carroId, item.id);
        closeList();
      }}
      buttonType="button--stroke"
    >
      Selecionar Professor
    </Button>
  </div>
);

export default ItemSelectProfessorCarro;
