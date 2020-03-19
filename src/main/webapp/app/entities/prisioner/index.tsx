import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Prisioner from './prisioner';
import PrisionerDetail from './prisioner-detail';
import PrisionerUpdate from './prisioner-update';
import PrisionerDeleteDialog from './prisioner-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrisionerDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrisionerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrisionerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrisionerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Prisioner} />
    </Switch>
  </>
);

export default Routes;
