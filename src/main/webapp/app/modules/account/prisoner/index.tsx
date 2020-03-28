import {Switch} from "react-router-dom";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import React from "react";
import Prisioner from './prisioner'
import PrisionerDetail from './prisioner-detail'
import PrisonerUpdate from './prisioner-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      {/*<ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrisionerDeleteDialog} />*/}
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrisonerUpdate} />
      {/*<ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrisionerUpdate} />*/}
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrisonerUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Prisioner} />
    </Switch>
  </>
);

export default Routes;
