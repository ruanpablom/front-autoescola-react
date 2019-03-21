import React from "react";
import uuid from "uuid/v1";

import TurmasService from "../../services/TurmasService";
import TurmasContext from "./TurmasContext";
import withAlunos from "../Alunos/withAlunos";

class TurmasProvider extends React.Component {
  state = {
    turmas: [],
    reloadTurmasHasError: false,
    isLoadingTurmas: false,
    saveTurmasHasError: false
  };
  componentDidMount() {
    this.handleReload();
  }
  handleSave = turmas => {
    this.setState({ isLoadingTurmas: true });
    TurmasService.save(turmas)
      .then(() => {
        this.setState({ isLoadingTurmas: false, saveTurmasHasError: false });
      })
      .catch(() => {
        this.setState({ isLoadingTurmas: false, saveTurmasHasError: true });
      });
  };
  handleReload = () => {
    if (this.props.wasReloadedAlunos) {
      this.setState({ isLoadingTurmas: true, reloadTurmasHasError: false });
      TurmasService.load()
        .then(turmas => {
          this.setState({ turmas, isLoadingTurmas: false });
        })
        .catch(() => {
          this.setState({ reloadTurmasHasError: true, isLoadingTurmas: false });
        });
    } else {
      this.props.onReloadAlunosRetry();
      this.setState({ reloadTurmasHasError: true, isLoadingTurmas: false });
    }
  };
  handleAddTurma = value => {
    this.setState(prevState => {
      const turmas = prevState.turmas.concat({
        id: uuid(),
        text: value
      });

      this.handleSave(turmas);

      return {
        turmas
      };
    });
  };
  handleDeleteTurma = idTurma => {
    this.setState(prevState => {
      const newTurmas = [...prevState.turmas];
      const index = newTurmas.findIndex(turma => turma.id === idTurma);

      newTurmas.splice(index, 1);

      this.handleSave(newTurmas);

      //remove turma in alunos array
      this.handleRemoveTurmaInAluno(idTurma);

      return {
        turmas: newTurmas
      };
    });
  };
  handleRemoveTurmaInAluno = turmaId => {
    this.props.alunos.forEach(aluno => {
      if (aluno.turma === turmaId) this.props.onRemoveTurmaAluno(aluno.id);
    });
  };
  handleEditTurmaTitle = (turmaId, text) => {
    this.setState(prevState => {
      const newTurmas = [...prevState.turmas];
      const index = newTurmas.findIndex(turma => turma.id === turmaId);
      newTurmas[index].text = text;

      this.handleSave(newTurmas);

      return {
        turmas: newTurmas
      };
    });
  };
  handleQtdAlunosTurma = turmaId => {
    let count = 0;
    this.props.alunos.forEach(aluno => {
      if (aluno.turma === turmaId) count++;
    });
    return count;
  };
  handleTurmaName = turmaId => {
    const index = this.state.turmas.findIndex(turma => turma.id === turmaId);
    return this.state.turmas[index].text;
  };
  handleTumaAlunosPossible = turmaId => {
    return (
      this.props.alunos.filter(
        aluno => aluno.turma === turmaId || aluno.turma === ""
      ) || []
    );
  };
  render() {
    return (
      <TurmasContext.Provider
        value={{
          ...this.state,
          onSaveTurmasRetry: () => {
            this.handleSave(this.state.turmas);
          },
          onReloadTurmasRetry: this.handleReload,
          onAddTurma: this.handleAddTurma,
          onDeleteTurma: this.handleDeleteTurma,
          onEditTurmaTitle: this.handleEditTurmaTitle,
          onTurmaName: this.handleTurmaName,
          onQtdAlunosTurma: this.handleQtdAlunosTurma,
          onTurmaAlunosPossible: this.handleTumaAlunosPossible,
          onAddTurmaAluno: this.props.onAddTurmaAluno,
          onRemoveTurmaAluno: this.props.onRemoveTurmaAluno
        }}
      >
        {this.props.children}
      </TurmasContext.Provider>
    );
  }
}

export default withAlunos(TurmasProvider);
