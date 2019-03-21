import React from "react";
import classNames from "classnames";

import { Link } from "react-router-dom";

const MenuItem = ({ onClick, to, isActive, icon, label }) => (
  <Link
    onClick={onClick}
    to={to}
    className={classNames("navigation-drawer__menu__item", {
      "navigation-drawer__menu__item-active": isActive
    })}
  >
    <i className={icon} />
    <span>{label}</span>
  </Link>
);

export default MenuItem;
