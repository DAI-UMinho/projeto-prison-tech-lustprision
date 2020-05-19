import './Sidebar.css'

import React, {useState} from "react";
import {NavLink, useRouteMatch} from "react-router-dom";
import {Nav} from "reactstrap";
import appIcon from "app/assets/images/lust-icon.png"
import adminRoutes from "app/shared/layout/sidebar/routes";

const Sidebar = props => {
  const currentRoute = useRouteMatch();
  const [sidebar, setSideBar] = useState();

  console.log(props.perm);

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}>
      <div className="logo">
        <a
          href={currentRoute.path}
          className="simple-text logo-mini">
          <div className="logo-img">
            <img src={appIcon} alt="react-logo"/>
          </div>
        </a>
        <a
          href={currentRoute.path}
          className="simple-text logo-normal"
        >LustPrision</a>
      </div>
      <div className="sidebar-wrapper ps">
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <NavLink
                to={prop.layout + prop.path}
                className="justatest"
                activeClassName="active"
                key={key}
              >
                <i className={prop.icon}/>
                <p>{prop.name}</p>
              </NavLink>
            );
          })}
        </Nav>
        {props.adminRights ? (
          <Nav>
            {props.admin.map((prop, key) => {
              return (
                <NavLink
                  to={prop.layout + prop.path}
                  className="justatest"
                  activeClassName="active"
                  key={key}
                >
                  <i className={prop.icon}/>
                  <p>{prop.name}</p>
                </NavLink>
              );
            })}
          </Nav>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
