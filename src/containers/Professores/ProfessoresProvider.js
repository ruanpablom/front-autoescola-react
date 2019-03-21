import React from "react";
import uuid from "uuid/v1";

import ProfessoresContext from "./ProfessoresContext";
import ProfessoresService from "../../services/ProfessoresService";

class ProfessoresProvider extends React.Component {
  state = {
    professores: [],
    isLoadingProfessores: false,
    reloadProfessoresHasError: false,
    saveProfessoresHasError: false,
    wasReloadedProfessors: false
  };
  componentDidMount() {
    this.handleReloadProfessores();
  }
  componentDidCatch() {
    this.setState({ reloadProfessoresHasError: true });
  }
  handleSaveProfessores = professores => {
    this.setState({
      isLoadingProfessores: true
    });

    ProfessoresService.save(professores)
      .then(() => {
        this.setState({
          isLoadingProfessores: false,
          saveProfessoresHasError: false
        });
      })
      .catch(() => {
        this.setState({
          isLoadingProfessores: false,
          saveProfessoresHasError: true
        });
      });
  };
  handleReloadProfessores = () => {
    this.setState({
      isLoadingProfessores: true,
      reloadProfessoresHasError: false
    });
    ProfessoresService.load()
      .then(professores => {
        this.setState({
          professores,
          isLoadingProfessores: false,
          wasReloadedProfessors: true
        });
      })
      .catch(() => {
        this.setState({
          isLoadingProfessores: false,
          reloadProfessoresHasError: true
        });
      });
  };
  handleAddProfessor = text => {
    this.setState(prevState => {
      const professores = prevState.professores.concat({ id: uuid(), text });

      this.handleSaveProfessores(professores);

      return {
        professores
      };
    });
  };
  handleDeleteProfessor = professorId => {
    this.setState(prevState => {
      const newProfessores = prevState.professores.slice();
      const index = newProfessores.findIndex(
        professor => professor.id === professorId
      );

      newProfessores.splice(index, 1);

      this.handleSaveProfessores(newProfessores);

      return { professores: newProfessores };
    });
  };
  handleEditProfessor = (professorId, text) => {
    this.setState(prevState => {
      const newProfessores = prevState.professores.slice();
      const index = newProfessores.findIndex(
        professor => professor.id === professorId
      );

      newProfessores[index].text = text;

      this.handleSaveProfessores(newProfessores);

      return { professores: newProfessores };
    });
  };
  handleProfessorName = professorId => {
    const index = this.state.professores.findIndex(
      professor => professor.id === professorId
    );

    return index !== -1
      ? this.state.professores[index].text
      : "Professor inválido";
  };
  render() {
    return (
      <ProfessoresContext.Provider
        value={{
          ...this.state,
          onAddProfessor: this.handleAddProfessor,
          onDeleteProfessor: this.handleDeleteProfessor,
          onEditProfessor: this.handleEditProfessor,
          onSaveProfessoresRetry: () => {
            this.handleSaveProfessores(this.state.professores);
          },
          onReloadProfessoresRetry: this.handleReloadProfessores,
          onProfessorName: this.handleProfessorName
        }}
      >
        {this.props.children}
      </ProfessoresContext.Provider>
    );
  }
}

export default ProfessoresProvider;
