import React from "react";

import "./list-item.scss";
import Button from "../Button/Button";

const SelectItem = ({ item, onSelect }) => (
  <div className="list-item__container">
    <div className="list-item__text__container">
      <span>{item.text}</span>
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

export default SelectItem;
