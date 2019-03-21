import React from "react";
import { Link } from "react-router-dom";

import Header from "../Header/Header";
import DivisionBar from "../DivisionBar/DivisionBar";

import "./section.scss";

const Section = ({ children, items }) => (
  <div>
    <Header>{children}</Header>
    <DivisionBar />
    <div className="servico__container">
      {items.map(item => (
        <Link key={item.path} to={item.path} className="servico__item">
          <i className={`${item.icon} servico__item__icon`} />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  </div>
);

export default Section;
