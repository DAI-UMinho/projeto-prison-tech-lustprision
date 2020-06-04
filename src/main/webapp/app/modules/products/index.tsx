import {Switch} from "react-router-dom";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import React from "react";
import ProductOverview from "app/modules/products/product-main";
import ProductEdit from "app/modules/products/product-edit";
import ProductCreate from "app/modules/products/product-new";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductCreate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductEdit} />
      <ErrorBoundaryRoute path={match.url} component={ProductOverview} />
    </Switch>
  </>
);

export default Routes;
