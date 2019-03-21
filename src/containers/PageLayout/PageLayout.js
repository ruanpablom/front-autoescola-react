import React from "react";

import { AppBar, NavigationDrawer, Container } from "../../components";
import withAlunos from "../Alunos/withAlunos";
import withTurmas from "../Turmas/withTurmas";
import withProfessores from "../Professores/withProfessores";
import withCarros from "../Carros/withCarros";

class PageLayout extends React.Component {
  state = { isMenuOpen: false };
  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };
  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };
  render() {
    const { isMenuOpen } = this.state;
    const {
      menu,
      children,
      saveAlunosHasError,
      isLoadingAluno,
      onSaveAlunosRetry,
      isLoadingTurmas,
      saveTurmasHasError,
      onSaveTurmasRetry,
      isLoadingProfessores,
      saveProfessoresHasError,
      onSaveProfessoresRetry,
      isLoadingCarros,
      saveCarrosHasError,
      onSaveCarrosRetry
    } = this.props;
    return (
      <div>
        <AppBar
          onOpenMenu={this.handleOpenMenu}
          isLoadingAluno={isLoadingAluno}
          saveAlunosHasError={saveAlunosHasError}
          onSaveAlunosRetry={onSaveAlunosRetry}
          isLoadingTurmas={isLoadingTurmas}
          saveTurmasHasError={saveTurmasHasError}
          onSaveTurmasRetry={onSaveTurmasRetry}
          isLoadingProfessores={isLoadingProfessores}
          saveProfessoresHasError={saveProfessoresHasError}
          onSaveProfessoresRetry={onSaveProfessoresRetry}
          isLoadingCarros={isLoadingCarros}
          saveCarrosHasError={saveCarrosHasError}
          onSaveCarrosRetry={onSaveCarrosRetry}
        />
        <Container>{children}</Container>
        <NavigationDrawer
          menu={menu}
          isMenuOpen={isMenuOpen}
          onCloseMenu={this.handleCloseMenu}
        />
      </div>
    );
  }
}

export default withTurmas(withAlunos(withProfessores(withCarros(PageLayout))));
