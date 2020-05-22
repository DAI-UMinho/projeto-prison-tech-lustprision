import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Employee from './employee';
import EmployeeInfo from './employee-info';

const Routes = ({ match }) => (
  <>
    <Switch>
{/*      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:login/edit`} component={UserManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:login`} component={UserManagementDetail} />*/}
      <ErrorBoundaryRoute exact path={`${match.url}/:login`} component={EmployeeInfo} />
      <ErrorBoundaryRoute path={match.url} component={Employee} />
    </Switch>
    {/*<ErrorBoundaryRoute path={`${match.url}/:login/delete`} component={UserManagementDeleteDialog} />*/}
  </>
);

export default Routes;
