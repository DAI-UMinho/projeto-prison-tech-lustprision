import '../../../login/login.css'
import logo from "../password-reset.png"

import React, {useEffect} from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Alert, Col, Row, ModalBody, CustomInput } from 'reactstrap';
import { handlePasswordResetInit, reset } from '../password-reset.reducer';

export type IPasswordResetInitProps = DispatchProps;

export const PasswordResetInit = (props: IPasswordResetInitProps) =>{

  useEffect(() => {
    return () => {
      props.reset();
    }
  }, []);

  const handleValidSubmit = (event, errors, values) => {
    props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };

    return( <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
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
                  <AvForm onSubmit={handleValidSubmit}>
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
                      <button type="submit" className="login100-form-btn">
                        <Translate contentKey="reset.request.form.button">Reset password</Translate>
                      </button>
                    </div>
                  </AvForm>
                </Col>
              </Row>
            </ModalBody>
        </div>
      </div>
    </div>)
};

const mapDispatchToProps = { handlePasswordResetInit, reset };

type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(PasswordResetInit);
