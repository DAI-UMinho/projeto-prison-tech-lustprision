import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import State from './state';
import StateDetail from './state-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StateDetail} />
      <ErrorBoundaryRoute path={match.url} component={State} />
    </Switch>
  </>
);

export default Routes;
