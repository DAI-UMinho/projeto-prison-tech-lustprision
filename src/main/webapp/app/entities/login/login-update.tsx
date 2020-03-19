import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './login.reducer';
import { ILogin } from 'app/shared/model/login.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILoginUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LoginUpdate = (props: ILoginUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { loginEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/login');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...loginEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lustPrisionApp.login.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.login.home.createOrEditLabel">Create or edit a Login</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : loginEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="login-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="login-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="userNameLabel" for="login-userName">
                  <Translate contentKey="lustPrisionApp.login.userName">User Name</Translate>
                </Label>
                <AvField id="login-userName" type="text" name="userName" />
              </AvGroup>
              <AvGroup>
                <Label id="posswordLabel" for="login-possword">
                  <Translate contentKey="lustPrisionApp.login.possword">Possword</Translate>
                </Label>
                <AvField id="login-possword" type="text" name="possword" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="login-type">
                  <Translate contentKey="lustPrisionApp.login.type">Type</Translate>
                </Label>
                <AvField id="login-type" type="text" name="type" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/login" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  loginEntity: storeState.login.entity,
  loading: storeState.login.loading,
  updating: storeState.login.updating,
  updateSuccess: storeState.login.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoginUpdate);
