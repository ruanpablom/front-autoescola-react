import React from "react";
import uuid from "uuid/v1";

import AulaPraticaContext from "./AulaPraticaContext";
import withAlunos from "../Alunos/withAlunos";
import withCarros from "../Carros/withCarros";
import withHorarios from "../Horarios/withHorarios";

class AulaPraticaProvider extends React.Component {
  state = { aulasPraticas: [], alunosAulas: [] };
  handleAddAula = (alunoId, carroId, horarioId) => {
    if (this.getQtdAulasAluno(alunoId) < 10) {
      const aulaId = this.handleAddAulaInAulasPraticas(
        alunoId,
        carroId,
        horarioId
      );
      this.handleAddAulaInAlunosAula(aulaId, alunoId);
    }
  };
  handleAddAulaInAulasPraticas = (alunoId, carroId, horarioId) => {
    const aulaId = uuid();
    this.setState(prevState => {
      const aulasPraticas = prevState.aulasPraticas.concat({
        id: aulaId,
        aluno: alunoId,
        carro: carroId,
        horario: horarioId
      });
      return { aulasPraticas };
    });
    return aulaId;
  };
  handleAddAulaInAlunosAula = (aulaId, alunoId) => {
    this.setState(prevState => {
      const newAlunosAulas = prevState.alunosAulas.slice();

      const alunosAulasIndex = this.state.alunosAulas.findIndex(
        aluno => aluno.id === alunoId
      );
      if (alunosAulasIndex !== -1) {
        newAlunosAulas[alunosAulasIndex].aulas.push(aulaId);
      } else {
        newAlunosAulas.push({ id: alunoId, aulas: [aulaId] });
      }
      return { alunosAulas: newAlunosAulas };
    });
  };
  handleFindAlunosAulasIndex = (arrayAlunosAulas, alunoId) => {
    const alunoIndex = arrayAlunosAulas.findIndex(
      aluno => aluno.id === alunoId
    );
    return alunoIndex;
  };
  handleGroupAulasByAlunos = () => {
    let alunos = [];
    const { aulasPraticas } = this.state;
    for (let i = 0; i < aulasPraticas.length; i++) {
      let alunoId = -1;
      for (let j = 0; j < alunos.length; j++) {
        if (aulasPraticas[i].aluno === alunos[j].id) {
          alunoId = j;
          break;
        }
        if (alunoId !== -1) {
          alunos[alunoId].aulas.push(aulasPraticas[i].id);
        } else {
          alunos.push({
            id: aulasPraticas[i].aluno,
            aulas: [aulasPraticas[i].id]
          });
        }
      }
    }
    return alunos;
  };
  getAulaCarroId = aulaId => {
    const aulaIndex = this.state.aulasPraticas.findIndex(
      aula => aula.id === aulaId
    );
    return aulaIndex !== -1 ? this.state.aulasPraticas[aulaIndex].carro : "";
  };
  getQtdAulasAluno = alunoId => {
    const alunoIndex = this.state.alunosAulas.findIndex(
      aluno => aluno.id === alunoId
    );

    return alunoIndex !== -1
      ? this.state.alunosAulas[alunoIndex].aulas.length
      : 0;
  };
  getAlunoCarroId = alunoId => {
    const alunoIndex = this.state.alunosAulas.findIndex(
      aluno => aluno.id === alunoId
    );

    return alunoIndex !== -1
      ? this.getAulaCarroId(this.state.alunosAulas[alunoIndex].aulas[0])
      : "";
  };
  getAulaHorarioId = aulaId => {
    const aulasPraticasIndex = this.state.aulasPraticas.findIndex(
      aula => aula.id === aulaId
    );

    return aulasPraticasIndex !== -1
      ? this.state.aulasPraticas[aulasPraticasIndex].horario
      : "";
  };
  handleRemoveAulaPratica = (alunoId, aulaId) => {
    this.setState(prevState => {
      //Removes aula from array aulas inside alunosAulas
      const newAlunosAulas = prevState.alunosAulas.slice();
      const alunoIndex = this.handleFindAlunosAulasIndex(
        newAlunosAulas,
        alunoId
      );
      if (alunoIndex !== -1) {
        const aulaIndex = newAlunosAulas[alunoIndex].aulas.findIndex(
          aula => aula === aulaId
        );
        if (aulaIndex !== -1) {
          newAlunosAulas[alunoIndex].aulas.splice(aulaIndex, 1);
        }
      }
      if (newAlunosAulas[alunoIndex].aulas.length === 0) {
        newAlunosAulas.splice(alunoIndex, 1);
      }

      //Removes aula from array aulasPraticas
      const newAulasPraticas = prevState.aulasPraticas.slice();
      const aulaPraticaIndex = newAulasPraticas.findIndex(
        aula => aula.id === aulaId
      );
      if (aulaPraticaIndex !== -1) {
        newAulasPraticas.splice(aulaPraticaIndex, 1);
      }

      return { alunosAulas: newAlunosAulas, aulasPraticas: newAulasPraticas };
    });
  };
  render() {
    return (
      <AulaPraticaContext.Provider
        value={{
          ...this.state,
          ...this.props,
          onAddAulaPratica: this.handleAddAula,
          onAulaCarroId: this.getAulaCarroId,
          onQtdAulasAluno: this.getQtdAulasAluno,
          onAlunoCarroId: this.getAlunoCarroId,
          onAulaHorarioId: this.getAulaHorarioId,
          onRemoveAulaPratica: this.handleRemoveAulaPratica
          /*onAlunoName: this.props.onAlunoName,
          onCarroName: this.props.onCarroName,
          onHorarioText: this.props.onHorarioText*/
        }}
      >
        {this.props.children}
      </AulaPraticaContext.Provider>
    );
  }
}

export default withHorarios(withCarros(withAlunos(AulaPraticaProvider)));
