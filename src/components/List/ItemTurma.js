import React from "react";

import ItemEdit from "./ItemEdit";
import ButtonLink from "../Button/ButtonLink";

const ItemTurma = ({ item, onEdit, onDelete, onQtdAlunosTurma }) => {
  let qtdAlunos = onQtdAlunosTurma(item.id);
  qtdAlunos = qtdAlunos > 0 ? `Alunos: ${qtdAlunos}` : "Nenhum aluno";
  return (
    <div>
      <ItemEdit
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
        extraTexts={[qtdAlunos]}
      >
        <ButtonLink
          to="turma-page"
          buttonType="button--stroke"
          aboutProps={item.id}
        >
          Alunos
        </ButtonLink>
      </ItemEdit>
    </div>
  );
};

export default ItemTurma;
