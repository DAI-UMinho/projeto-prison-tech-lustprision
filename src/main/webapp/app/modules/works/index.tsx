import {Switch} from "react-router-dom";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import React from "react";
import Works from "app/modules/works/works";
import WorkCreate from "app/modules/works/work-new";
import WorkInfo from "app/modules/works/work-info";

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WorkCreate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WorkInfo} />
      <ErrorBoundaryRoute path={match.url} component={Works} />
    </Switch>
  </>
);

export default Routes;
