import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PressWork from './press-work';
import PressWorkDetail from './press-work-detail';
import PressWorkUpdate from './press-work-update';
import PressWorkDeleteDialog from './press-work-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PressWorkDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PressWorkUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PressWorkUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PressWorkDetail} />
      <ErrorBoundaryRoute path={match.url} component={PressWork} />
    </Switch>
  </>
);

export default Routes;
