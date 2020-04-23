import {Switch} from "react-router-dom";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

import React from "react";
import Quiz from "./quiz";
import Question from "./question";

const Routes = ({ match }) => (
  <>
    <Switch>
      {/*<ErrorBoundaryRoute exact path={`${match.url}/new`} component={WorkCreate} />*/}
      {/*<ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WorkInfo} />*/}
      <ErrorBoundaryRoute exact path={`${match.url}/questions`} component={Question} />
      <ErrorBoundaryRoute path={match.url} component={Quiz} />
    </Switch>
  </>
);

export default Routes;
