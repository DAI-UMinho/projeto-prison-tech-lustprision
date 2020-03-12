import Sidebar from "app/shared/layout/sidebar/Sidebar";
import routes from "app/shared/layout/sidebar/routes";
import {Switch} from 'react-router-dom';
import React from "react";
import Settings from 'app/modules/account/settings/settings'
import Password from 'app/modules/account/password/password'
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

const Dashboard = ({ match }) => {
  return (
    <div className="wrapper">
      <Sidebar
        bgColor='black'
        activeColor='info'
        routes={routes}
      />
      <div className="main-panel">
        <Switch>
          <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings}/>
          <ErrorBoundaryRoute path={`${match.url}/password`} component={Password}/>
        </Switch>
      </div>
    </div>)
};

export default Dashboard;

