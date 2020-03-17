import Sidebar from "app/shared/layout/sidebar/Sidebar";
import routes from "app/shared/layout/sidebar/routes";
import {Switch, Redirect, useRouteMatch} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";
import Footer from "app/shared/layout/footer/footer-dashboard";
import Header from "app/shared/layout/header/header-dashboard";
import User from "app/modules/account/settings/settings-dashboard";
import {AUTHORITIES} from 'app/config/constants';
import ErrorBoundary from "app/shared/error/error-boundary";
import Scrollbars from "react-custom-scrollbars"
import HDashboard from "app/modules/home/home-dashboard";
import PrivateRoute from "app/shared/auth/private-route";


export interface IDashboardProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}
let ps;

const Dashboard = (props: IDashboardProps) => {
  const currentRoute = useRouteMatch();
  const paddingTop = '-62px';

  return (
    <div className="wrapper">
      <Sidebar
        bgColor='black'
        activeColor='info'
        routes={routes}
      />
     <Scrollbars>
      <div className="main-panel ps" style={{paddingTop}}>
        <Header/>
        <div className="content content-padding">
          <Switch>
            <PrivateRoute path={`${currentRoute.url}/profile`} component={User} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>
            <PrivateRoute path={`${currentRoute.url}/home`} component={HDashboard} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>
            <ErrorBoundary>
              <Redirect to={`${currentRoute.url}/home`}/>
            </ErrorBoundary>
          </Switch>
        </div>
        <Footer/>
      </div>
     </Scrollbars>
    </div>)
};

export default Dashboard;

