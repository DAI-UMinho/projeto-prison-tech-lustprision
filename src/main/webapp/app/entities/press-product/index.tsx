import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PressProduct from './press-product';
import PressProductDetail from './press-product-detail';
import PressProductUpdate from './press-product-update';
import PressProductDeleteDialog from './press-product-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PressProductDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PressProductUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PressProductUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PressProductDetail} />
      <ErrorBoundaryRoute path={match.url} component={PressProduct} />
    </Switch>
  </>
);

export default Routes;
