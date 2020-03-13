import '../../../login/login.css'
import logo from "../password-reset.png"

import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert, Col, Row, ModalBody, CustomInput } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { handlePasswordResetInit, reset } from '../password-reset.reducer';
import {Link} from "react-router-dom";

export type IPasswordResetInitProps = DispatchProps;

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };

  render() {
    return( <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <AvForm onSubmit={this.handleValidSubmit}>
            <ModalBody>
              <div className="login-form-test">
                <img src={logo} className="login-logo"></img>
              </div>
              <span className="login100-form-title p-b-34 p-t-27">
                <Translate contentKey="reset.request.title">Reset your password</Translate>
              </span>
              <Row>
                <Col md="12">
                  <Alert color="warning">
                    <p>
                      <Translate contentKey="reset.request.messages.info">Enter the email address you used to register</Translate>
                    </p>
                  </Alert>
                </Col>
                <Col md="12">
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
                  <div className="container-login100-form-btn">
                    <button className="login100-form-btn">
                      <Translate contentKey="reset.request.form.button">Reset password</Translate>
                    </button>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </AvForm>
        </div>
      </div>
    </div>)

   /* return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1>
              <Translate contentKey="reset.request.title">Reset your password</Translate>
            </h1>
            <Alert color="warning">
              <p>
                <Translate contentKey="reset.request.messages.info">Enter the email address you used to register</Translate>
              </p>
            </Alert>
            <AvForm onValidSubmit={this.handleValidSubmit}>
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
              <Button color="primary" type="submit">
                <Translate contentKey="reset.request.form.button">Reset password</Translate>
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );*/
  }
}

const mapDispatchToProps = { handlePasswordResetInit, reset };

type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(PasswordResetInit);
