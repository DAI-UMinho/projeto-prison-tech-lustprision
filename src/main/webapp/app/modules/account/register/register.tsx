import '../../login/login.css'
import logo from "../../login/login-icon.png"

import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button, ModalBody, CustomInput } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';
import {Link} from "react-router-dom";

export interface IRegisterProps extends StateProps, DispatchProps {}

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword, props.currentLocale);
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);

  return(
    <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100">
        <AvForm onValidSubmit={handleValidSubmit}>
          <ModalBody>
            <div className="login-form-test">
              <img src={logo} className="login-logo"></img>
            </div>
            <span className="login100-form-title p-b-34 p-t-27" id="register-title">
              <Translate contentKey="register.title">Registration</Translate>
            </span>
            <Row>
              <Col md="12">
                <div className="wrap-input100 validate-input">
                  <AvField
                    tag={CustomInput}
                    className="input100"
                    name="username"
                    placeholder={translate('global.form.username.placeholder')}
                    validate={{
                      required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                      pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                      minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                      maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
                    }}
                  />
                  <span className="focus-input100 icon-google-wallet" data-placeholder="&#xf207;"></span>
                </div>
                <div className="wrap-input100 validate-input">
                  <AvField
                    tag={CustomInput}
                    className="input100"
                    name="email"
                    placeholder={translate('global.form.email.placeholder')}
                    type="email"
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                      minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                      maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
                    }}
                  />
                  <span className="focus-input100" data-placeholder="&#xf105;"></span>
                </div>
                <div className="wrap-input100 validate-input">
                  <AvField
                    tag={CustomInput}
                    className="input100"
                    name="firstPassword"
                    placeholder={translate('global.form.newpassword.placeholder')}
                    type="password"
                    onChange={updatePassword}
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                      minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                      maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                    }}
                  />
                  <span className="focus-input100" data-placeholder="&#xf191;"></span>
                </div>
                <PasswordStrengthBar password={password} />
                <div className="wrap-input100 validate-input">
                  <AvField
                    tag={CustomInput}
                    className="input100"
                    name="secondPassword"
                    placeholder={translate('global.form.confirmpassword.placeholder')}
                    type="password"
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                      minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                      maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                      match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
                    }}
                  />
                  <span className="focus-input100" data-placeholder="&#xf191;"></span>
                </div>
                /*{/*<div className="wrap-input100 validate-input">
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
                </div>*/}
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    <Translate contentKey="register.form.button">Register</Translate>
                  </button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </AvForm>
      </div>
    </div>
  </div>);

  /* return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">
            <Translate contentKey="register.title">Registration</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              label={translate('global.form.username.label')}
              placeholder={translate('global.form.username.placeholder')}
              validate={{
                required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
              }}
            />
            <AvField
              name="email"
              label={translate('global.form.email.label')}
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
              }}
            />
            <AvField
              name="firstPassword"
              label={translate('global.form.newpassword.label')}
              placeholder={translate('global.form.newpassword.placeholder')}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label={translate('global.form.confirmpassword.label')}
              placeholder={translate('global.form.confirmpassword.placeholder')}
              type="password"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
              }}
            />
            <Button id="register-submit" color="primary" type="submit">
              <Translate contentKey="register.form.button">Register</Translate>
            </Button>
          </AvForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>
              <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
            </span>
            <a className="alert-link">
              <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
            </a>
            <span>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Translate>
            </span>
          </Alert>
        </Col>
      </Row>
    </div>
  );*/
};

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
