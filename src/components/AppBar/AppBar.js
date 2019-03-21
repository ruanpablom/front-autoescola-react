import React from "react";
import { withRouter } from "react-router";

import "./app-bar.scss";

const AppBar = ({
  onOpenMenu,
  isLoadingAluno,
  saveAlunosHasError,
  onSaveAlunosRetry,
  isLoadingTurmas,
  saveTurmasHasError,
  onSaveTurmasRetry,
  isLoadingProfessores,
  saveProfessoresHasError,
  onSaveProfessoresRetry,
  isLoadingCarros,
  saveCarrosHasError,
  onSaveCarrosRetry,
  location
}) => {
  let isLoading = false;
  let saveHasError = false;
  let onSaveRetry = () => {};

  switch (location.pathname) {
    case "/aula-teorica":
      isLoading = isLoadingTurmas || isLoadingAluno;
      saveHasError = saveTurmasHasError;
      onSaveRetry = onSaveTurmasRetry;
      break;
    case "/turma-page":
      isLoading = isLoadingAluno;
      saveHasError = saveAlunosHasError;
      onSaveRetry = onSaveAlunosRetry;
      break;
    case "/alunos":
      isLoading = isLoadingAluno;
      saveHasError = saveAlunosHasError;
      onSaveRetry = onSaveAlunosRetry;
      break;
    case "/professores":
      isLoading = isLoadingProfessores;
      saveHasError = saveProfessoresHasError;
      onSaveRetry = onSaveProfessoresRetry;
      break;
    case "/carros":
      isLoading = isLoadingCarros || isLoadingProfessores;
      saveHasError = saveCarrosHasError;
      onSaveRetry = onSaveCarrosRetry;
      break;
    case "/aula-pratica":
      isLoading = isLoadingCarros || isLoadingProfessores || isLoadingAluno;
      saveHasError = false;
      onSaveRetry = false;
      break;
    default:
      isLoading = false;
      saveHasError = false;
      onSaveRetry = () => {};
      break;
  }
  return (
    <div className="app-bar">
      <div className="app-bar__container">
        <button className="app-bar__action" onClick={onOpenMenu}>
          <i className="material-icons">menu</i>
        </button>
        <span className="app-bar__brand">Auto Escola</span>
        {isLoading && (
          <span className="app-bar__reload app-bar__reload--rotate">
            <i className="material-icons">refresh</i>
          </span>
        )}
        {saveHasError && (
          <button className="app-bar__action" onClick={onSaveRetry}>
            <i className="material-icons" style={{ color: "red" }}>
              cloud_off
            </i>
          </button>
        )}
      </div>
    </div>
  );
};

export default withRouter(AppBar);
