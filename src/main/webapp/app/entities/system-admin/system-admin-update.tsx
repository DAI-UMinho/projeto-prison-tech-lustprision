import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILogin } from 'app/shared/model/login.model';
import { getEntities as getLogins } from 'app/entities/login/login.reducer';
import { IPermission } from 'app/shared/model/permission.model';
import { getEntities as getPermissions } from 'app/entities/permission/permission.reducer';
import { getEntity, updateEntity, createEntity, reset } from './system-admin.reducer';
import { ISystemAdmin } from 'app/shared/model/system-admin.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISystemAdminUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SystemAdminUpdate = (props: ISystemAdminUpdateProps) => {
  const [loginId, setLoginId] = useState('0');
  const [permissionId, setPermissionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { systemAdminEntity, logins, permissions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/system-admin');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLogins();
    props.getPermissions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...systemAdminEntity,
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
          <h2 id="lustPrisionApp.systemAdmin.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.systemAdmin.home.createOrEditLabel">Create or edit a SystemAdmin</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : systemAdminEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="system-admin-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="system-admin-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameAdminLabel" for="system-admin-nameAdmin">
                  <Translate contentKey="lustPrisionApp.systemAdmin.nameAdmin">Name Admin</Translate>
                </Label>
                <AvField id="system-admin-nameAdmin" type="text" name="nameAdmin" />
              </AvGroup>
              <AvGroup>
                <Label id="passwordLabel" for="system-admin-password">
                  <Translate contentKey="lustPrisionApp.systemAdmin.password">Password</Translate>
                </Label>
                <AvField id="system-admin-password" type="text" name="password" />
              </AvGroup>
              <AvGroup>
                <Label for="system-admin-login">
                  <Translate contentKey="lustPrisionApp.systemAdmin.login">Login</Translate>
                </Label>
                <AvInput id="system-admin-login" type="select" className="form-control" name="login.id">
                  <option value="" key="0" />
                  {logins
                    ? logins.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="system-admin-permission">
                  <Translate contentKey="lustPrisionApp.systemAdmin.permission">Permission</Translate>
                </Label>
                <AvInput id="system-admin-permission" type="select" className="form-control" name="permission.id">
                  <option value="" key="0" />
                  {permissions
                    ? permissions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/system-admin" replace color="info">
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
  logins: storeState.login.entities,
  permissions: storeState.permission.entities,
  systemAdminEntity: storeState.systemAdmin.entity,
  loading: storeState.systemAdmin.loading,
  updating: storeState.systemAdmin.updating,
  updateSuccess: storeState.systemAdmin.updateSuccess
});

const mapDispatchToProps = {
  getLogins,
  getPermissions,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUpdate);
