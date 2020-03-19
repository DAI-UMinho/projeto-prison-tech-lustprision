import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AdminEmploy from './admin-employ';
import AdminEmployDetail from './admin-employ-detail';
import AdminEmployUpdate from './admin-employ-update';
import AdminEmployDeleteDialog from './admin-employ-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AdminEmployDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AdminEmployUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AdminEmployUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AdminEmployDetail} />
      <ErrorBoundaryRoute path={match.url} component={AdminEmploy} />
    </Switch>
  </>
);

export default Routes;
