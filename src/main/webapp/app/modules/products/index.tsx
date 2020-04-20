import {Switch} from "react-router-dom";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import React from "react";
import ProductUpdate from "app/modules/products/product-new";
import ProductOverview from "app/modules/products/product-main";
import ProductEditInfo from "app/modules/products/product-edit";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductEditInfo} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductEditInfo} />
      <ErrorBoundaryRoute path={match.url} component={ProductOverview} />
    </Switch>
  </>
);

export default Routes;
