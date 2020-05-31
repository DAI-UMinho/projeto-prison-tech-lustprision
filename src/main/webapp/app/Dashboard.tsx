import Sidebar from "app/shared/layout/sidebar/Sidebar";
import routes from "app/shared/layout/sidebar/routes";
import {adminRoutes} from "app/shared/layout/sidebar/routes";
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
import Prisioner from "app/modules/account/prisoner/";
import Products from "app/modules/products/";
import Works from "app/modules/works/";
import Employees from "app/modules/administration/employees/";
import Quiz from "app/modules/quizs"
import DocsPage from "app/modules/administration/docs/docs";
import AuditsPage from "app/modules/administration/audits/audits";

export interface IDashboardProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Dashboard = (props: IDashboardProps) => {
  const currentRoute = useRouteMatch();
  const paddingTop = '-62px';

  return (
    <div className="wrapper">
      <Sidebar
        bgColor='blue'
        activeColor='info'
        routes={routes}
        admin={adminRoutes}
        adminRights={props.isAuthenticated && props.isAdmin}
      />
     <Scrollbars>
      <div className="main-panel ps" style={{paddingTop}}>
        <Header currentUrl={currentRoute} {...props}/>
        <div className="content content-padding">
          <Switch>
            <PrivateRoute path={`${currentRoute.url}/profile`} component={User} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>
            <PrivateRoute path={`${currentRoute.url}/works`} component={Works} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>
            <PrivateRoute path={`${currentRoute.url}/products`} component={Products} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>
            <PrivateRoute path={`${currentRoute.url}/home`} component={HDashboard} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>
            <PrivateRoute path={`${currentRoute.url}/prisoners`} component={Prisioner} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>
            <PrivateRoute path={`${currentRoute.url}/quizs`} component={Quiz} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>

            <PrivateRoute path={`${currentRoute.url}/employees`} component={Employees} hasAnyAuthorities={[AUTHORITIES.ADMIN]}/>
            <PrivateRoute path={`${currentRoute.url}/audits`} component={AuditsPage} hasAnyAuthorities={[AUTHORITIES.ADMIN]}/>
            <PrivateRoute path={`${currentRoute.url}/docs`} component={DocsPage} hasAnyAuthorities={[AUTHORITIES.ADMIN]}/>
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

