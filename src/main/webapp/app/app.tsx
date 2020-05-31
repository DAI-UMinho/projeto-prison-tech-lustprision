import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";
import Login from "app/modules/login/login";
import Register from "app/modules/account/register/register";
import ActivatePage from "app/modules/account/activate/activate";
import PasswordResetInit from "app/modules/account/password-reset/init/password-reset-init";
import Dashboard from "app/Dashboard";
import PasswordResetFinish from "app/modules/account/password-reset/finish/password-reset-finish";
import Logout from "app/modules/login/logout";

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);

  const paddingTop = '62px';

  return (
    <Router basename={baseHref}>
      <div className="app-container">
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <Switch>
          <Route path="/dashboard" render={() =>
            <Dashboard isAuthenticated={props.isAuthenticated}
                       isAdmin={props.isAdmin}
                       currentLocale={props.currentLocale}
                       onLocaleChange={props.setLocale}
                       ribbonEnv={props.ribbonEnv}
                       isInProduction={props.isInProduction}
                       isSwaggerEnabled={props.isSwaggerEnabled}/>
          }/>
          <div id="no-auth" style={{ paddingTop }}>
            <ErrorBoundary>
              <Header
                isAuthenticated={props.isAuthenticated}
                isAdmin={props.isAdmin}
                currentLocale={props.currentLocale}
                onLocaleChange={props.setLocale}
                ribbonEnv={props.ribbonEnv}
                isInProduction={props.isInProduction}
                isSwaggerEnabled={props.isSwaggerEnabled}
              />
            </ErrorBoundary>
            <Switch>
              <ErrorBoundaryRoute path="/logout" exact component={Logout}/>
              <ErrorBoundaryRoute path="/login" exact={true} component={Login}/>
              <ErrorBoundaryRoute path="/account/register" exact={true} component={Register} />
              <ErrorBoundaryRoute path="/account/activate/:key?" component={ActivatePage}/>
              <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish}/>
              <ErrorBoundaryRoute path="/account/reset/request" exact={true} component={PasswordResetInit} />
              <div className="container-fluid view-container" id="app-view-container">
                <Card className="jh-card">
                  <ErrorBoundary>
                    <AppRoutes />
                  </ErrorBoundary>
                </Card>
                <Footer />
              </div>
            </Switch>
          </div>
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
