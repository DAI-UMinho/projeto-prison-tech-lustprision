import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILogin } from 'app/shared/model/login.model';
import { getEntities as getLogins } from 'app/entities/login/login.reducer';
import { IPermission } from 'app/shared/model/permission.model';
import { getEntities as getPermissions } from 'app/entities/permission/permission.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './prisioner.reducer';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrisionerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrisionerUpdate = (props: IPrisionerUpdateProps) => {
  const [loginId, setLoginId] = useState('0');
  const [permissionId, setPermissionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prisionerEntity, logins, permissions, loading, updating } = props;

  const { profileImage, profileImageContentType } = prisionerEntity;

  const handleClose = () => {
    props.history.push('/prisioner');
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

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...prisionerEntity,
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
          <h2 id="lustPrisionApp.prisioner.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.prisioner.home.createOrEditLabel">Create or edit a Prisioner</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prisionerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prisioner-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="prisioner-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="prisioner-name">
                  <Translate contentKey="lustPrisionApp.prisioner.name">Name</Translate>
                </Label>
                <AvField id="prisioner-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="biLabel" for="prisioner-bi">
                  <Translate contentKey="lustPrisionApp.prisioner.bi">Bi</Translate>
                </Label>
                <AvField id="prisioner-bi" type="string" className="form-control" name="bi" />
              </AvGroup>
              <AvGroup>
                <Label id="imageLabel" for="prisioner-image">
                  <Translate contentKey="lustPrisionApp.prisioner.image">Image</Translate>
                </Label>
                <AvField id="prisioner-image" type="text" name="image" />
              </AvGroup>
              <AvGroup>
                <Label id="numPrisionerLabel" for="prisioner-numPrisioner">
                  <Translate contentKey="lustPrisionApp.prisioner.numPrisioner">Num Prisioner</Translate>
                </Label>
                <AvField id="prisioner-numPrisioner" type="string" className="form-control" name="numPrisioner" />
              </AvGroup>
              <AvGroup>
                <Label id="numCellLabel" for="prisioner-numCell">
                  <Translate contentKey="lustPrisionApp.prisioner.numCell">Num Cell</Translate>
                </Label>
                <AvField id="prisioner-numCell" type="string" className="form-control" name="numCell" />
              </AvGroup>
              <AvGroup>
                <Label id="dataNascimentoLabel" for="prisioner-dataNascimento">
                  <Translate contentKey="lustPrisionApp.prisioner.dataNascimento">Data Nascimento</Translate>
                </Label>
                <AvField id="prisioner-dataNascimento" type="date" className="form-control" name="dataNascimento" />
              </AvGroup>
              <AvGroup>
                <Label id="balanceLabel" for="prisioner-balance">
                  <Translate contentKey="lustPrisionApp.prisioner.balance">Balance</Translate>
                </Label>
                <AvField id="prisioner-balance" type="string" className="form-control" name="balance" />
              </AvGroup>
              <AvGroup>
                <Label id="workingLabel" for="prisioner-working">
                  <Translate contentKey="lustPrisionApp.prisioner.working">Working</Translate>
                </Label>
                <AvField id="prisioner-working" type="string" className="form-control" name="working" />
              </AvGroup>
              <AvGroup>
                <Label id="passwordLabel" for="prisioner-password">
                  <Translate contentKey="lustPrisionApp.prisioner.password">Password</Translate>
                </Label>
                <AvField id="prisioner-password" type="text" name="password" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="profileImageLabel" for="profileImage">
                    <Translate contentKey="lustPrisionApp.prisioner.profileImage">Profile Image</Translate>
                  </Label>
                  <br />
                  {profileImage ? (
                    <div>
                      <a onClick={openFile(profileImageContentType, profileImage)}>
                        <img src={`data:${profileImageContentType};base64,${profileImage}`} style={{ maxHeight: '100px' }} />
                      </a>
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {profileImageContentType}, {byteSize(profileImage)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('profileImage')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  {!profileImage ? (
                    <input id="file_profileImage" type="file" onChange={onBlobChange(true, 'profileImage')} accept="image/*" />
                  ) : null}
                  <AvInput type="hidden" name="profileImage" value={profileImage} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="prisioner-login">
                  <Translate contentKey="lustPrisionApp.prisioner.login">Login</Translate>
                </Label>
                <AvInput id="prisioner-login" type="select" className="form-control" name="login.id">
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
                <Label for="prisioner-permission">
                  <Translate contentKey="lustPrisionApp.prisioner.permission">Permission</Translate>
                </Label>
                <AvInput id="prisioner-permission" type="select" className="form-control" name="permission.id">
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
              <Button tag={Link} id="cancel-save" to="/prisioner" replace color="info">
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
  prisionerEntity: storeState.prisioner.entity,
  loading: storeState.prisioner.loading,
  updating: storeState.prisioner.updating,
  updateSuccess: storeState.prisioner.updateSuccess
});

const mapDispatchToProps = {
  getLogins,
  getPermissions,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerUpdate);
