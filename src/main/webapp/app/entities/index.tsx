import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Prisioner from './prisioner';
import PressWork from './press-work';
import PrisQuiz from './pris-quiz';
import QuestionQuiz from './question-quiz';
import PressProduct from './press-product';
import Work from './work';
import Quiz from './quiz';
import Question from './question';
import Purchase from './purchase';
import Product from './product';
import Login from './login';
import Permission from './permission';
import SystemAdmin from './system-admin';
import AdminEmploy from './admin-employ';
import Pressproduct from './pressproduct';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}prisioner`} component={Prisioner} />
      <ErrorBoundaryRoute path={`${match.url}press-work`} component={PressWork} />
      <ErrorBoundaryRoute path={`${match.url}pris-quiz`} component={PrisQuiz} />
      <ErrorBoundaryRoute path={`${match.url}question-quiz`} component={QuestionQuiz} />
      <ErrorBoundaryRoute path={`${match.url}press-product`} component={PressProduct} />
      <ErrorBoundaryRoute path={`${match.url}work`} component={Work} />
      <ErrorBoundaryRoute path={`${match.url}quiz`} component={Quiz} />
      <ErrorBoundaryRoute path={`${match.url}question`} component={Question} />
      <ErrorBoundaryRoute path={`${match.url}purchase`} component={Purchase} />
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}login2`} component={Login} />
      <ErrorBoundaryRoute path={`${match.url}permission`} component={Permission} />
      <ErrorBoundaryRoute path={`${match.url}system-admin`} component={SystemAdmin} />
      <ErrorBoundaryRoute path={`${match.url}admin-employ`} component={AdminEmploy} />
      <ErrorBoundaryRoute path={`${match.url}pressproduct`} component={Pressproduct} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
