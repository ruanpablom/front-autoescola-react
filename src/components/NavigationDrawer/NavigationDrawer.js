import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

import "./navigation-drawer.scss";
import MenuItem from "./MenuItem";

const NavigationDrawer = ({ menu, isMenuOpen, onCloseMenu, location }) => (
  <div
    className={classNames("navigation-drawer", {
      "navigation-drawer__open": isMenuOpen
    })}
  >
    <div className="navigation-drawer__header">
      <button className="navigation-drawer__button" onClick={onCloseMenu}>
        <i className="material-icons">close</i>
      </button>
    </div>
    <div className="navigation-drawer__menu">
      {menu.map(menuItem => (
        <MenuItem
          key={menuItem.path}
          to={menuItem.path}
          isActive={location.pathname === menuItem.path}
          icon={menuItem.icon}
          label={menuItem.label}
          onClick={onCloseMenu}
        />
      ))}
    </div>
  </div>
);

export default withRouter(NavigationDrawer);
