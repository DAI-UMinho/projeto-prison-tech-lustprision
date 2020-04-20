import {Switch} from "react-router-dom";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import React from "react";
import Prisioner from './prisioner'
import PrisionerDetail from './prisioner-info'
import PrisonerUpdate from './prisioner-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrisionerDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrisonerUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Prisioner} />
    </Switch>
  </>
);

export default Routes;
