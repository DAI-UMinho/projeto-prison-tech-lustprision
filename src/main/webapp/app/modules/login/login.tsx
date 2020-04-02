import './login.css'

import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import {IRootState} from 'app/shared/reducers';
import {login} from 'app/shared/reducers/authentication';
import {ModalBody, Alert, Row, Col, CustomInput} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {translate, Translate} from "react-jhipster";

import logo from "./login-icon.png"

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export const Login = (props: ILoginProps) => {

  const loginError: boolean = props.loginError;
  const handleLogin = (username, password, rememberMe = false) => props.login(username, password, rememberMe);

  const handleSubmit = (event, errors, {username, password, rememberMe}) => {
    handleLogin(username, password, rememberMe);
  };

  const {location, isAuthenticated} = props;
  const {from} = (location.state as any) || {from: {pathname: '/', search: location.search}};
  if (isAuthenticated) {
    return <Redirect to={from}/>;
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <AvForm onSubmit={handleSubmit}>
            <ModalBody>
              <div className="login-form-test">
                <img src={logo} className="login-logo"></img>
              </div>
              <span className="login100-form-title p-b-34 p-t-27">
                Log in
              </span>
              <Row>
                <Col md="12">
                  {loginError ? (
                    <Alert color="danger">
                      <Translate contentKey="login.messages.error.authentication">
                        <strong>Failed to sign in!</strong> Please check your credentials and try again.
                      </Translate>
                    </Alert>
                  ) : null}
                </Col>
                <Col md="12">
                  <div className="wrap-input100 validate-input">
                    <AvField
                      tag={CustomInput}
                      className="input100"
                      name="username"
                      placeholder={translate('global.form.username.placeholder')}
                      required
                      errorMessage="Username cannot be empty!"
                    />
                    <span className="focus-input100" data-placeholder="&#xf207;"></span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <AvField
                      tag={CustomInput}
                      className="input100"
                      name="password"
                      type="password"
                      placeholder={translate('login.form.password.placeholder')}
                      required
                      errorMessage="Password cannot be empty!"
                    />
                    <span className="focus-input100" data-placeholder="&#xf191;"></span>
                  </div>
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
                      Login
                    </button>
                  </div>
                </Col>
              </Row>
              <div className="mt-1">&nbsp;</div>
              <Alert color="info" >
                <Link to="/account/reset/request" style={{color: '#fffffff'}}>
                  <Translate contentKey="login.password.forgot">Did you forget your password?</Translate>
                </Link>
              </Alert>
              <Alert color="info">
              <span>
                <Translate
                  contentKey="global.messages.info.register.noaccount">You don&apos;t have an account yet?</Translate>
              </span>{' '}
                <Link to="/account/register">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
            </ModalBody>
          </AvForm>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({authentication}: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError
});

const mapDispatchToProps = {login};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
