import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SystemAdmin from './system-admin';
import SystemAdminDetail from './system-admin-detail';
import SystemAdminUpdate from './system-admin-update';
import SystemAdminDeleteDialog from './system-admin-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SystemAdminDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SystemAdminUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SystemAdminUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SystemAdminDetail} />
      <ErrorBoundaryRoute path={match.url} component={SystemAdmin} />
    </Switch>
  </>
);

export default Routes;
