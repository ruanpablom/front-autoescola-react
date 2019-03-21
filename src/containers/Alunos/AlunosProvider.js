import React from "react";
import uuid from "uuid/v1";

import AlunosContext from "./AlunosContext";
import AlunosService from "../../services/AlunosService";

class AlunosProvider extends React.Component {
  state = {
    alunos: [],
    isLoadingAluno: false,
    saveAlunosHasError: false,
    reloadAlunosHasError: false,
    wasReloadedAlunos: false
  };
  componentDidMount() {
    this.handleReload();
  }
  componentDidCatch() {
    this.setState({ reloadAlunosHasError: true });
  }
  handleSave = alunos => {
    this.setState({ isLoadingAluno: true });
    AlunosService.save(alunos)
      .then(() => {
        this.setState({ isLoadingAluno: false, saveAlunosHasError: false });
      })
      .catch(() => {
        this.setState({ isLoadingAluno: false, saveAlunosHasError: true });
      });
  };
  handleReload = () => {
    this.setState({ isLoadingAluno: true, reloadAlunosHasError: false });
    AlunosService.load()
      .then(alunos => {
        this.setState({
          alunos,
          isLoadingAluno: false,
          wasReloadedAlunos: true
        });
      })
      .catch(() => {
        this.setState({ reloadAlunosHasError: true, isLoadingAluno: false });
      });
  };
  handleAddAluno = text => {
    this.setState(prevState => {
      const alunos = prevState.alunos.concat({ id: uuid(), text, turma: "" });

      this.handleSave(alunos);

      return {
        alunos
      };
    });
  };
  handleDelete = id => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const index = newAlunos.findIndex(aluno => aluno.id === id);

      newAlunos.splice(index, 1);

      this.handleSave(newAlunos);

      return { alunos: newAlunos };
    });
  };
  handleEdit = (id, value) => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const index = newAlunos.findIndex(aluno => aluno.id === id);

      newAlunos[index].text = value;

      this.handleSave(newAlunos);

      return {
        alunos: newAlunos
      };
    });
  };
  handleRemoveTurma = alunoId => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const index = newAlunos.findIndex(aluno => aluno.id === alunoId);

      newAlunos[index].turma = "";

      this.handleSave(newAlunos);

      return {
        alunos: newAlunos
      };
    });
  };
  handleAddTurma = (alunoId, turmaId) => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const index = newAlunos.findIndex(aluno => aluno.id === alunoId);

      newAlunos[index].turma = turmaId;

      this.handleSave(newAlunos);

      return { alunos: newAlunos };
    });
  };
  handleAlunoName = alunoId => {
    const index = this.state.alunos.findIndex(aluno => aluno.id === alunoId);

    return index !== -1 ? this.state.alunos[index].text : "Aluno inválido";
  };
  render() {
    return (
      <AlunosContext.Provider
        value={{
          ...this.state,
          onSaveAlunosRetry: () => {
            this.handleSave(this.state.alunos);
          },
          onAddAluno: this.handleAddAluno,
          onEditAluno: this.handleEdit,
          onDeleteAluno: this.handleDelete,
          onReloadAlunosRetry: this.handleReload,
          onAlunoName: this.handleAlunoName,
          onRemoveTurmaAluno: this.handleRemoveTurma,
          onAddTurmaAluno: this.handleAddTurma
        }}
      >
        {this.props.children}
      </AlunosContext.Provider>
    );
  }
}

export default AlunosProvider;
