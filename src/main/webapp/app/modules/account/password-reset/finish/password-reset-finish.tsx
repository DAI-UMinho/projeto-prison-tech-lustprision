import '../../../login/login.css'
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Col, Row, ModalBody, CustomInput} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {Translate, translate, getUrlParameter} from 'react-jhipster';
import {RouteComponentProps} from 'react-router-dom';

import {handlePasswordResetFinish, reset} from '../password-reset.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import logo from "app/modules/account/password-reset/password-reset.png";

export interface IPasswordResetFinishProps extends DispatchProps, RouteComponentProps<{ key: string }> {
}

export const PasswordResetFinishPage = (props: IPasswordResetFinishProps) => {
  const [password, setPassword] = useState('');
  const [key] = useState(getUrlParameter('key', props.location.search));

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => props.handlePasswordResetFinish(key, values.newPassword);

  const updatePassword = event => setPassword(event.target.value);

  const getResetForm = () => {
    return (
      <AvForm onValidSubmit={handleValidSubmit}>
        <div className="wrap-input100 validate-input">
          <AvField
            tag={CustomInput}
            name="newPassword"
            className="input100"
            placeholder={translate('global.form.newpassword.placeholder')}
            type="password"
            validate={{
              required: {value: true, errorMessage: translate('global.messages.validate.newpassword.required')},
              minLength: {value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength')},
              maxLength: {value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength')}
            }}
            onChange={updatePassword}
          />
          <span className="focus-input100" data-placeholder="&#xf191;"></span>
        </div>
        <PasswordStrengthBar password={password}/>
        <div className="wrap-input100 validate-input">
          <AvField
            tag={CustomInput}
            name="confirmPassword"
            className="input100"
            placeholder={translate('global.form.confirmpassword.placeholder')}
            type="password"
            validate={{
              required: {value: true, errorMessage: translate('global.messages.validate.confirmpassword.required')},
              minLength: {value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength')},
              maxLength: {value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength')},
              match: {value: 'newPassword', errorMessage: translate('global.messages.error.dontmatch')}
            }}
          />
          <span className="focus-input100" data-placeholder="&#xf191;"></span>
        </div>
        <div className="container-login100-form-btn">
          <button type="submit" className="login100-form-btn">
            <Translate contentKey="reset.request.form.button">Save password</Translate>
          </button>
        </div>
      </AvForm>
    );
  };

  return (
    <div className="limiter">
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
                <div>{key ? getResetForm() : null}</div>
              </Col>
            </Row>
          </ModalBody>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {handlePasswordResetFinish, reset};

type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(PasswordResetFinishPage);
