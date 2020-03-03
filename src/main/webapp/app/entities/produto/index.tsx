import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Produto from './produto';
import ProdutoDetail from './produto-detail';
import ProdutoUpdate from './produto-update';
import ProdutoDeleteDialog from './produto-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProdutoDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProdutoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProdutoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProdutoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Produto} />
    </Switch>
  </>
);

export default Routes;
