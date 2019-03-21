import React from "react";
import uuid from "uuid/v1";

import { dateToString } from "../../utils";

import HorariosContext from "./HorariosContext";

class HorariosProvider extends React.Component {
  state = {
    horarios: [
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 14, 30))
      },
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 15, 30))
      },
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 16, 30))
      },
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 17, 30))
      },
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 18, 30))
      },
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 19, 30))
      },
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 20, 30))
      },
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 21, 30))
      },
      {
        id: uuid(),
        text: dateToString(new Date(2019, 3, 23, 22, 30))
      }
    ]
  };
  handleHorariosText = horarioId => {
    const index = this.state.horarios.findIndex(
      horario => horario.id === horarioId
    );

    return index !== -1 ? this.state.horarios[index].text : "Horário inválido";
  };
  render() {
    return (
      <HorariosContext.Provider
        value={{ ...this.state, onHorarioText: this.handleHorariosText }}
      >
        {this.props.children}
      </HorariosContext.Provider>
    );
  }
}

export default HorariosProvider;
