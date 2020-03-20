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
import { getEntity, updateEntity, createEntity, reset } from './admin-employ.reducer';
import { IAdminEmploy } from 'app/shared/model/admin-employ.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAdminEmployUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdminEmployUpdate = (props: IAdminEmployUpdateProps) => {
  const [loginId, setLoginId] = useState('0');
  const [permissionId, setPermissionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { adminEmployEntity, logins, permissions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/admin-employ');
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
        ...adminEmployEntity,
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
          <h2 id="lustPrisionApp.adminEmploy.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.adminEmploy.home.createOrEditLabel">Create or edit a AdminEmploy</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : adminEmployEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="admin-employ-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="admin-employ-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idAdminEmpLabel" for="admin-employ-idAdminEmp">
                  <Translate contentKey="lustPrisionApp.adminEmploy.idAdminEmp">Id Admin Emp</Translate>
                </Label>
                <AvField id="admin-employ-idAdminEmp" type="string" className="form-control" name="idAdminEmp" />
              </AvGroup>
              <AvGroup>
                <Label id="nameAdminEmpLabel" for="admin-employ-nameAdminEmp">
                  <Translate contentKey="lustPrisionApp.adminEmploy.nameAdminEmp">Name Admin Emp</Translate>
                </Label>
                <AvField id="admin-employ-nameAdminEmp" type="text" name="nameAdminEmp" />
              </AvGroup>
              <AvGroup>
                <Label id="passwordLabel" for="admin-employ-password">
                  <Translate contentKey="lustPrisionApp.adminEmploy.password">Password</Translate>
                </Label>
                <AvField id="admin-employ-password" type="text" name="password" />
              </AvGroup>
              <AvGroup>
                <Label for="admin-employ-login">
                  <Translate contentKey="lustPrisionApp.adminEmploy.login">Login</Translate>
                </Label>
                <AvInput id="admin-employ-login" type="select" className="form-control" name="login.id">
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
                <Label for="admin-employ-permission">
                  <Translate contentKey="lustPrisionApp.adminEmploy.permission">Permission</Translate>
                </Label>
                <AvInput id="admin-employ-permission" type="select" className="form-control" name="permission.id">
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
              <Button tag={Link} id="cancel-save" to="/admin-employ" replace color="info">
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
  adminEmployEntity: storeState.adminEmploy.entity,
  loading: storeState.adminEmploy.loading,
  updating: storeState.adminEmploy.updating,
  updateSuccess: storeState.adminEmploy.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminEmployUpdate);
