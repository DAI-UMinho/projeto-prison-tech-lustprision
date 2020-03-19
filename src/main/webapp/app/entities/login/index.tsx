import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Login from './login';
import LoginDetail from './login-detail';
import LoginUpdate from './login-update';
import LoginDeleteDialog from './login-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LoginDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LoginUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LoginUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LoginDetail} />
      <ErrorBoundaryRoute path={match.url} component={Login} />
    </Switch>
  </>
);

export default Routes;
