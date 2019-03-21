const zeroFill = number => {
  return (number < 10 ? "0" : "") + number;
};
export const dateToString = date => {
  const horario = date;
  const data = `${zeroFill(horario.getDay())}/${zeroFill(
    horario.getMonth()
  )}/${horario.getFullYear()}`;
  const hora = `${zeroFill(horario.getHours())}:${zeroFill(
    horario.getMinutes()
  )}`;

  return `${data} ${hora}`;
};
