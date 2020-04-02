import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Row, Col, Alert, ModalBody} from 'reactstrap';
import {Translate, getUrlParameter} from 'react-jhipster';

import {IRootState} from 'app/shared/reducers';
import {activateAction, reset} from './activate.reducer';

import failedLogo from './failed-activation.png'
import successLogo from './sucess-activation.png'

const successAlert = (
  <div>
    <div className="login-form-test">
      <img src={successLogo} className="login-logo"/>
    </div>
    <Alert color="success">
      <Translate contentKey="activate.messages.success">
        <strong>Your user account has been activated.</strong> Please
      </Translate>
      <Link to="/login" className="alert-link">
        <Translate contentKey="global.messages.info.authenticated.link">sign in</Translate>
      </Link>
    </Alert>
  </div>
);

const failureAlert = (
  <div>
    <div className="login-form-test">
      <img src={failedLogo} className="login-logo"/>
    </div>
    <span className="login100-form-title p-b-34 p-t-27">
      Failed Activation
    </span>
    <Alert color="danger">
      <Translate contentKey="activate.messages.error">
        <strong>Your user could not be activated. AA</strong> Please use the registration form to sign up.
      </Translate>
    </Alert>
  </div>
);

export interface IActivateProps extends StateProps, DispatchProps, RouteComponentProps<{ key: any }> {
}

export const ActivatePage = (props: IActivateProps) => {
  useEffect(() => {
    const key = getUrlParameter('key', props.location.search);
    props.activateAction(key);
    return () => {
      props.reset();
    };
  }, []);

  return (
    <div>
      <div className="container-login100">
        <div className="wrap-login100 ">
          <ModalBody>
            {props.activationSuccess ? successAlert : undefined}
            {props.activationFailure ? failureAlert : undefined}
          </ModalBody>
        </div>
      </div>
      {/*      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="activate.title">Activation</Translate>
          </h1>
          {props.activationSuccess ? successAlert : undefined}
          {props.activationFailure ? failureAlert : undefined}
        </Col>
      </Row>*/}
    </div>
  );
};

const mapStateToProps = ({activate}: IRootState) => ({
  activationSuccess: activate.activationSuccess,
  activationFailure: activate.activationFailure
});

const mapDispatchToProps = {activateAction, reset};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ActivatePage);
