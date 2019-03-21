import React from "react";

import "./list-item.scss";
import Button from "../Button/Button";
import IconButton from "../Button/IconButton";

class ItemAlunoAulaPratica extends React.Component {
  state = {
    isOpenAulasList: false
  };
  handleOpenAulasList = () => {
    this.setState({ isOpenAulasList: true });
  };
  handleCloseAulasList = () => {
    this.setState({ isOpenAulasList: false });
  };
  handleAulaListButton = () => {
    if (this.state.isOpenAulasList) this.handleCloseAulasList();
    else this.handleOpenAulasList();
  };
  render() {
    const {
      item,
      onHorarioText,
      onAulaHorarioId,
      onAlunoName,
      onCarroName,
      onAulaCarroId,
      onQtdAulasAluno,
      onRemoveAulaPratica
    } = this.props;
    return (
      <div>
        <div className="list-item__container">
          <div className="list-item__text__container">
            <span className="list-item__text">
              Aluno:{onAlunoName(item.id)}
            </span>
            <span className="list-item__text">
              Carro:{onCarroName(onAulaCarroId(item.aulas[0]))}
            </span>
            <span className="list-item__text">
              Aulas:{onQtdAulasAluno(item.id)}
            </span>
          </div>
          <Button
            onClick={this.handleAulaListButton}
            buttonType="button--stroke"
          >
            Aulas
          </Button>
          {this.state.isOpenAulasList &&
            item.aulas.map(aula => (
              <div key={aula} className="list-item__container">
                <span className="list-item__text">
                  {onHorarioText(onAulaHorarioId(aula))}
                </span>
                <IconButton
                  onClick={() => {
                    onRemoveAulaPratica(item.id, aula);
                  }}
                  icon="delete"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ItemAlunoAulaPratica;
