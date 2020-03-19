import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PrisQuiz from './pris-quiz';
import PrisQuizDetail from './pris-quiz-detail';
import PrisQuizUpdate from './pris-quiz-update';
import PrisQuizDeleteDialog from './pris-quiz-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PrisQuizDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PrisQuizUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PrisQuizUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PrisQuizDetail} />
      <ErrorBoundaryRoute path={match.url} component={PrisQuiz} />
    </Switch>
  </>
);

export default Routes;
