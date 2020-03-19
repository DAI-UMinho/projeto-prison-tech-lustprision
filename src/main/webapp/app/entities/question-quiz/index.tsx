import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QuestionQuiz from './question-quiz';
import QuestionQuizDetail from './question-quiz-detail';
import QuestionQuizUpdate from './question-quiz-update';
import QuestionQuizDeleteDialog from './question-quiz-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={QuestionQuizDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuestionQuizUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuestionQuizUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuestionQuizDetail} />
      <ErrorBoundaryRoute path={match.url} component={QuestionQuiz} />
    </Switch>
  </>
);

export default Routes;
