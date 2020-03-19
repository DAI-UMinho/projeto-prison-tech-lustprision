import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPermission } from 'app/shared/model/permission.model';
import { getEntities as getPermissions } from 'app/entities/permission/permission.reducer';
import { ILogin } from 'app/shared/model/login.model';
import { getEntities as getLogins } from 'app/entities/login/login.reducer';
import { getEntity, updateEntity, createEntity, reset } from './system-admin.reducer';
import { ISystemAdmin } from 'app/shared/model/system-admin.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISystemAdminUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SystemAdminUpdate = (props: ISystemAdminUpdateProps) => {
  const [idPermissionId, setIdPermissionId] = useState('0');
  const [loginId, setLoginId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { systemAdminEntity, permissions, logins, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/system-admin');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPermissions();
    props.getLogins();
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
                <Label id="idSysAdminLabel" for="system-admin-idSysAdmin">
                  <Translate contentKey="lustPrisionApp.systemAdmin.idSysAdmin">Id Sys Admin</Translate>
                </Label>
                <AvField id="system-admin-idSysAdmin" type="string" className="form-control" name="idSysAdmin" />
              </AvGroup>
              <AvGroup>
                <Label id="nameAdminLabel" for="system-admin-nameAdmin">
                  <Translate contentKey="lustPrisionApp.systemAdmin.nameAdmin">Name Admin</Translate>
                </Label>
                <AvField id="system-admin-nameAdmin" type="text" name="nameAdmin" />
              </AvGroup>
              <AvGroup>
                <Label id="userNameAdminLabel" for="system-admin-userNameAdmin">
                  <Translate contentKey="lustPrisionApp.systemAdmin.userNameAdmin">User Name Admin</Translate>
                </Label>
                <AvField id="system-admin-userNameAdmin" type="text" name="userNameAdmin" />
              </AvGroup>
              <AvGroup>
                <Label id="passwordLabel" for="system-admin-password">
                  <Translate contentKey="lustPrisionApp.systemAdmin.password">Password</Translate>
                </Label>
                <AvField id="system-admin-password" type="text" name="password" />
              </AvGroup>
              <AvGroup>
                <Label id="permissionIdPermissionLabel" for="system-admin-permissionIdPermission">
                  <Translate contentKey="lustPrisionApp.systemAdmin.permissionIdPermission">Permission Id Permission</Translate>
                </Label>
                <AvField id="system-admin-permissionIdPermission" type="string" className="form-control" name="permissionIdPermission" />
              </AvGroup>
              <AvGroup>
                <Label for="system-admin-idPermission">
                  <Translate contentKey="lustPrisionApp.systemAdmin.idPermission">Id Permission</Translate>
                </Label>
                <AvInput id="system-admin-idPermission" type="select" className="form-control" name="idPermission.id">
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
  permissions: storeState.permission.entities,
  logins: storeState.login.entities,
  systemAdminEntity: storeState.systemAdmin.entity,
  loading: storeState.systemAdmin.loading,
  updating: storeState.systemAdmin.updating,
  updateSuccess: storeState.systemAdmin.updateSuccess
});

const mapDispatchToProps = {
  getPermissions,
  getLogins,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminUpdate);
