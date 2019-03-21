import React from "react";
import uuid from "uuid/v1";

import CarrosContext from "./CarrosContext";
import CarrosService from "../../services/CarrosService";
import withProfessores from "../Professores/withProfessores";

class CarrosProvider extends React.Component {
  state = {
    carros: [],
    isLoadingCarros: false,
    saveCarrosHasError: false,
    reloadCarrosHasError: false,
    wasReloadedCarros: false
  };
  componentDidMount() {
    this.handleReloadCarros();
  }
  componentDidUpdate(prevProps) {
    if (this.state.wasReloadedCarros) {
      if (
        JSON.stringify(prevProps.professores) !==
        JSON.stringify(this.props.professores)
      ) {
        this.removeInvalidProfessors(this.state.carros);
      }
    }
  }
  componentDidCatch() {
    this.setState({ reloadCarrosHasError: true });
  }
  removeInvalidProfessors = carros => {
    let wasRemovedInvalidProfessors = false;
    carros.forEach(carro => {
      if (this.professorWasRemoved(carro.professor)) {
        carro.professor = "";
        wasRemovedInvalidProfessors = true;
      }
    });
    if (wasRemovedInvalidProfessors) this.handleSaveCarros(carros);
    return wasRemovedInvalidProfessors;
  };
  professorWasRemoved = professorId => {
    let professorWasRemoved = true;

    this.props.professores.forEach(professor => {
      if (professor.id === professorId) professorWasRemoved = false;
    });

    return professorWasRemoved;
  };
  handleSaveCarros = carros => {
    this.setState({ isLoadingCarros: true, saveCarrosHasError: false });
    CarrosService.save(carros)
      .then(() => {
        this.setState({ isLoadingCarros: false, saveCarrosHasError: false });
      })
      .catch(() => {
        this.setState({ isLoadingCarros: false, saveCarrosHasError: true });
      });
  };
  handleReloadCarros = () => {
    if (!this.state.isLoadingCarros) {
      this.setState({
        isLoadingCarros: true
      });
    }
    if (this.props.wasReloadedProfessors) {
      CarrosService.load()
        .then(carros => {
          this.removeInvalidProfessors(carros);
          this.setState({
            carros,
            isLoadingCarros: false,
            reloadCarrosHasError: false,
            wasReloadedCarros: true
          });
        })
        .catch(() => {
          this.setState({
            isLoadingCarros: false,
            reloadCarrosHasError: true
          });
        });
    } else {
      this.props.onReloadProfessoresRetry();
      this.setState({ reloadCarrosHasError: true, isLoadingCarros: false });
    }
  };
  handleAddCarro = text => {
    this.setState(prevState => {
      const carros = prevState.carros.concat({
        id: uuid(),
        text,
        professor: ""
      });

      this.handleSaveCarros(carros);

      return { carros };
    });
  };
  handleRemoveCarro = carroId => {
    this.setState(prevState => {
      const newCarros = prevState.carros.slice();
      const index = newCarros.findIndex(carro => carro.id === carroId);

      newCarros.splice(index, 1);

      this.handleSaveCarros(newCarros);

      return { carros: newCarros };
    });
  };
  handleEditCarro = (carroId, text) => {
    this.setState(prevState => {
      const newCarros = prevState.carros.slice();
      const index = newCarros.findIndex(carro => carro.id === carroId);

      newCarros[index].text = text;

      this.handleSaveCarros(newCarros);

      return { carros: newCarros };
    });
  };
  handleAddProfessorCarro = (carroId, professorId) => {
    this.setState(prevState => {
      const newCarros = prevState.carros.slice();
      const index = newCarros.findIndex(carro => carro.id === carroId);

      newCarros[index].professor = professorId;

      this.handleSaveCarros(newCarros);

      return { carros: newCarros };
    });
  };
  handleCarrosName = carroId => {
    const index = this.state.carros.findIndex(carro => carro.id === carroId);

    return index !== -1 ? this.state.carros[index].text : "Carro inválido";
  };
  handleCarroProfessorName = carroId => {
    const index = this.state.carros.findIndex(carro => carro.id === carroId);

    if (index !== -1) {
      if (this.state.carros[index].professor === "")
        return "Cadastre um professor";
      let professorName = this.props.onProfessorName(
        this.state.carros[index].professor
      );
      return `Professor: ${professorName}`;
    }
    return "Carro Inválido";
  };
  render() {
    return (
      <CarrosContext.Provider
        value={{
          ...this.state,
          onAddCarro: this.handleAddCarro,
          onEditCarro: this.handleEditCarro,
          onRemoveCarro: this.handleRemoveCarro,
          onAddProfessorCarro: this.handleAddProfessorCarro,
          onReloadCarrosRetry: this.handleReloadCarros,
          onSaveCarrosRetry: () => {
            this.handleSaveCarros(this.state.carros);
          },
          onCarroName: this.handleCarrosName,
          onCarroProfessorName: this.handleCarroProfessorName,
          professores: this.props.professores
        }}
      >
        {this.props.children}
      </CarrosContext.Provider>
    );
  }
}

export default withProfessores(CarrosProvider);
