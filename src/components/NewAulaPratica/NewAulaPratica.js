import React from "react";
import classNames from "classnames";

import List from "../List/List";

import "./new-aula-pratica.scss";
import { AddButton } from "..";
import SelectItemAluno from "../List/SelectItemAluno";
import SelectItemCarro from "../List/SelectItemCarro";
import SelectItem from "../List/SelectItem";

class NewAulaPratica extends React.Component {
  state = {
    isIncluding: false,
    isOpenAlunos: false,
    isOpenCarros: false,
    isOpenHorarios: false,
    alunoId: "",
    carroId: "",
    horarioId: ""
  };
  handleOpenAddItem = () => {
    this.setState({ isIncluding: true });
  };
  handleCloseAddItem = () => {
    this.setState({ isIncluding: false });
  };
  handleHorariosOpen = () => {
    this.setState({
      isOpenHorarios: true,
      isOpenCarros: false,
      isOpenAlunos: false
    });
  };
  handleHorariosClose = () => {
    this.setState({ isOpenHorarios: false });
  };
  handleCarrosOpen = () => {
    this.setState({
      isOpenHorarios: false,
      isOpenCarros: true,
      isOpenAlunos: false
    });
  };
  handleCarrosClose = () => {
    this.setState({ isOpenCarros: false });
  };
  handleAlunosOpen = () => {
    this.setState({
      isOpenHorarios: false,
      isOpenCarros: false,
      isOpenAlunos: true
    });
  };
  handleAlunosClose = () => {
    this.setState({ isOpenAlunos: false });
  };
  onSelectAluno = alunoId => {
    this.setState({ alunoId });
    this.handleAlunosClose();
    const alunoCarroId = this.props.onAlunoCarroId(alunoId);
    if (alunoCarroId) this.onSelectCarro(alunoCarroId);
  };
  handleAlunosHasCarro = alunoId => {
    if (this.props.onAlunoCarroId(alunoId)) return true;
    else return false;
  };
  onSelectCarro = carroId => {
    this.setState({ carroId });
    this.handleCarrosClose();
  };
  onSelectHorario = horarioId => {
    this.setState({ horarioId });
    this.handleHorariosClose();
  };
  handleClear = () => {
    this.setState({
      alunoId: "",
      carroId: "",
      horarioId: "",
      isOpenHorarios: false,
      isOpenCarros: false,
      isOpenAlunos: false
    });
  };
  canInclude = () => {
    return this.hasAluno() && this.hasCarro() && this.hasHorario();
  };
  hasAluno = () => {
    return this.state.alunoId.length > 0;
  };
  hasCarro = () => {
    return this.state.carroId.length > 0;
  };
  hasHorario = () => {
    return this.state.horarioId.length > 0;
  };
  render() {
    const {
      isIncluding,
      alunoId,
      carroId,
      horarioId,
      isOpenAlunos,
      isOpenCarros,
      isOpenHorarios
    } = this.state;
    const {
      alunos,
      carros,
      horarios,
      onAddItem,
      onAlunoName,
      onCarroName,
      onCarroProfessorName,
      onHorarioText,
      onQtdAulasAluno
    } = this.props;
    return (
      <div>
        <AddButton onClick={this.handleOpenAddItem} isClose={isIncluding} />
        <div
          className={classNames("new-aula-pratica__container", {
            "new-aula-pratica__container--close": !isIncluding
          })}
        >
          <div className="new-aula-pratica__items-container">
            <div className="new-aula-pratica__box">
              {this.hasAluno() ? (
                <span className="new-aula-pratica__text">
                  {onAlunoName(alunoId)}
                </span>
              ) : (
                <span className="new-aula-pratica__text">
                  Selecione um Aluno
                </span>
              )}
              <button
                className="new-aula-pratica__button"
                onClick={() => this.handleAlunosOpen()}
              >
                Alunos
              </button>
            </div>
            <div className="new-aula-pratica__box">
              {this.hasCarro() ? (
                <span className="new-aula-pratica__text">
                  {onCarroName(carroId)}
                </span>
              ) : (
                <span className="new-aula-pratica__text">
                  Selecione um Carro
                </span>
              )}
              <button
                className="new-aula-pratica__button"
                disabled={this.handleAlunosHasCarro(alunoId)}
                onClick={() => this.handleCarrosOpen()}
              >
                Carros
              </button>
            </div>
            <div className="new-aula-pratica__box">
              {this.hasHorario() ? (
                <span className="new-aula-pratica__text">
                  {onHorarioText(horarioId)}
                </span>
              ) : (
                <span className="new-aula-pratica__text">
                  Selecione um Horário
                </span>
              )}
              <button
                className="new-aula-pratica__button"
                onClick={() => this.handleHorariosOpen()}
              >
                Horarios
              </button>
            </div>
            <div className="new-aula-pratica__list-container">
              {isOpenAlunos && (
                <List
                  items={alunos}
                  ItemComponent={SelectItemAluno}
                  props={{ onSelect: this.onSelectAluno, onQtdAulasAluno }}
                />
              )}
              {isOpenCarros && (
                <List
                  items={carros}
                  ItemComponent={SelectItemCarro}
                  props={{
                    onSelect: this.onSelectCarro,
                    onCarroProfessorName: onCarroProfessorName
                  }}
                />
              )}
              {isOpenHorarios && (
                <List
                  items={horarios}
                  ItemComponent={SelectItem}
                  props={{ onSelect: this.onSelectHorario }}
                />
              )}
            </div>
          </div>
          <div className="new-aula-pratica__buttons__container">
            <button
              style={{ marginRight: "10px" }}
              className="new-aula-pratica__button"
              onClick={() => {
                this.handleClear();
                this.handleCloseAddItem();
              }}
            >
              Cancelar
            </button>
            <button
              className="new-aula-pratica__button"
              style={{ marginRight: "10px" }}
              onClick={() => {
                this.handleClear();
              }}
            >
              Limpar
            </button>
            <button
              className="new-aula-pratica__button"
              disabled={!this.canInclude()}
              onClick={() => {
                this.handleClear();
                onAddItem(alunoId, carroId, horarioId);
              }}
            >
              Incluir
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAulaPratica;
