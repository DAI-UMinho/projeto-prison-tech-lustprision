/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import './Sidebar.css'

import React, {useState} from "react";
import {NavLink, useRouteMatch} from "react-router-dom";
import {Nav} from "reactstrap";

const Sidebar = props => {
  const currentRoute = useRouteMatch();
  const [sidebar, setSideBar] = useState(React.createRef());

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href={currentRoute.path}
          className="simple-text logo-mini">
          <div className="logo-img">
            <img src="https://i.ibb.co/r4R8yYm/login-icon.png" alt="react-logo"/>
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
      </div>
    </div>
  );
};

export default Sidebar;
