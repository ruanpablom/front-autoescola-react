import React from "react";

import "./list-item.scss";
import Button from "../Button/Button";
import List from "./List";
import ItemEdit from "./ItemEdit";
import ItemSelectProfessorCarro from "./ItemSelectProfessorCarro";

class ItemCarro extends React.Component {
  state = {
    isOpenProfessoresList: false
  };
  handleOpenProfessoresList = () => {
    this.setState({ isOpenProfessoresList: true });
  };
  handleCloseProfessoresList = () => {
    this.setState({ isOpenProfessoresList: false });
  };

  render() {
    const { isOpenProfessoresList } = this.state;
    const {
      item,
      onDelete,
      professores,
      onAddProfessorCarro,
      onCarroProfessorName,
      onEdit
    } = this.props;
    return (
      <div>
        <ItemEdit
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          extraTexts={[onCarroProfessorName(item.id)]}
        >
          {!isOpenProfessoresList && professores.length > 0 && (
            <Button
              onClick={this.handleOpenProfessoresList}
              buttonType="button--stroke"
            >
              {item.professor === ""
                ? "Adicionar Professor"
                : "Trocar Professor"}
            </Button>
          )}
          {isOpenProfessoresList && (
            <List
              items={professores}
              ItemComponent={ItemSelectProfessorCarro}
              props={{
                carroId: item.id,
                onSelect: onAddProfessorCarro,
                closeList: this.handleCloseProfessoresList
              }}
            />
          )}
        </ItemEdit>
      </div>
    );
  }
}

export default ItemCarro;
