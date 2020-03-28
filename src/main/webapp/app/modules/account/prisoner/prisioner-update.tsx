import {Link, RouteComponentProps} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {byteSize, openFile, setFileData, translate, Translate} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IRootState} from "app/shared/reducers";
import {getEntities as getLogins} from "app/entities/login/login.reducer";
import {getEntities as getPermissions} from "app/entities/permission/permission.reducer";

import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import { Button, Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import {createEntity, getEntity, reset, setBlob, updateEntity} from "app/entities/prisioner/prisioner.reducer";
import {connect} from "react-redux";
import PasswordStrengthBar from "app/shared/layout/password/password-strength-bar";

export interface IPrisionerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const PrisonerUpdate = (props: IPrisionerUpdateProps) => {
  const [loginId, setLoginId] = useState('0');
  const [permissionId, setPermissionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [password, setPassword] = useState('');

  const {prisionerEntity, logins, permissions, loading, updating} = props;

  const {profileImage, profileImageContentType} = prisionerEntity;

  const updatePassword = event => setPassword(event.target.value);

  const handleClose = () => {
    props.history.push('/dashboard/prisoners');
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
        ...values,
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
          <Card className="card-user justify-content-center">
            <CardHeader>
              <CardTitle tag="h5">
                {isNew ? ("Novo Prisioneiro") : ("Editar Prisioneiro")}
              </CardTitle>
            </CardHeader>
            <CardBody>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={isNew ? {} : prisionerEntity} onSubmit={saveEntity}>
                  <div className="profile-wrap">
                    {profileImage ? (
                      <div>
                        <a onClick={openFile(profileImageContentType, profileImage)}>
                          <img src={`data:${profileImageContentType};base64,${profileImage}`}
                               className="profile-avatar-wrap"/>
                        </a>
                        <br/>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('profileImage')}>
                            <FontAwesomeIcon icon="times-circle"/>
                          </Button>
                        </Col>
                      </div>
                    ) : null}
                    <Row className="row justify-content-center">
                      {!profileImage ? (
                        <div className="file-drop-area">
                          <span className="fake-btn">Choose files</span>
                          <span className="file-msg">or drag and drop files here</span>
                          <input className="file-input" id="file_profileImage" type="file"
                                 onChange={onBlobChange(true, 'profileImage')} accept="image/*"/>
                          <AvInput type="hidden" name="profileImage" value={profileImage}/>
                        </div>) : null}
                    </Row>
                  </div>
                  <AvGroup>
                    <Translate contentKey="lustPrisionApp.prisioner.name">Name</Translate>
                    <AvField id="prisioner-name" type="text" name="name"
                             validate={{
                               required: {
                                 value: true,
                                 errorMessage: translate('settings.messages.validate.firstname.required')
                               },
                               minLength: {
                                 value: 1,
                                 errorMessage: translate('settings.messages.validate.firstname.minlength')
                               },
                               maxLength: {
                                 value: 50,
                                 errorMessage: translate('settings.messages.validate.firstname.maxlength')
                               }
                             }}/>
                  </AvGroup>
                  <AvGroup>
                    <Translate contentKey="lustPrisionApp.prisioner.numPrisioner">Num Prisioner</Translate>
                    <AvField id="prisioner-numPrisioner" type="text" className="form-control" name="numPrisioner"
                             validate={{
                               number: true,
                               required: {
                                 value: true,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.numPrisoner.required')
                               },
                               minLength: {
                                 value: 5,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.numPrisoner.length')
                               },
                               maxLength: {
                                 value: 5,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.numPrisoner.length')
                               }
                             }}/>
                  </AvGroup>
                  <AvGroup>
                    <Translate contentKey="lustPrisionApp.prisioner.numCell">Num Cell</Translate>
                    <AvField id="prisioner-numCell" type="text" className="form-control" name="numCell"
                             validate={{
                               number: true,
                               required: {
                                 value: true,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.numCell.required')
                               },
                               minLength: {
                                 value: 1,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.numCell.maxLength')
                               },
                               maxLength: {
                                 value: 4,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.numCell.maxLength')
                               }
                             }}/>
                  </AvGroup>
                  <AvGroup>
                    <Translate contentKey="lustPrisionApp.prisioner.dataNascimento">Data Nascimento</Translate>
                    <AvField id="prisioner-dataNascimento" type="date" className="form-control" name="dataNascimento"/>
                  </AvGroup>
                  <AvGroup>
                    <Translate contentKey="lustPrisionApp.prisioner.bi">Bi</Translate>
                    <AvField id="prisioner-bi" type="text" className="form-control" name="bi"
                             value={prisionerEntity.bi}
                             validate={{
                               number: true,
                               required: {
                                 value: true,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.bi.required')
                               },
                               minLength: {
                                 value: 9,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.bi.length')
                               },
                               maxLength: {
                                 value: 9,
                                 errorMessage: translate('lustPrisionApp.prisioner.validation.bi.length')
                               }
                             }}/>
                  </AvGroup>
                  <AvGroup>
                    <Translate contentKey="lustPrisionApp.prisioner.password">Password</Translate>
                    <AvField id="prisioner-password" type="password" name="password"
                             validate={{
                               required: {
                                 value: true,
                                 errorMessage: translate('global.messages.validate.newpassword.required')
                               },
                               minLength: {
                                 value: 6,
                                 errorMessage: translate('global.messages.validate.newpassword.minlength')
                               },
                               maxLength: {
                                 value: 50,
                                 errorMessage: translate('global.messages.validate.newpassword.maxlength')
                               }
                             }}
                             onChange={updatePassword}/>
                    <PasswordStrengthBar password={password}/>
                  </AvGroup>
                  <AvField id="prisioner-password" type="hidden" name="balance" value="0"/>
                  <AvGroup>
                    <Translate contentKey="lustPrisionApp.prisioner.permission">Permission</Translate>
                    <AvInput id="prisioner-permission" type="select" className="form-control" name="permission.id">
                      <option value="" key="0"/>
                      {permissions
                        ? permissions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <Button tag={Link} id="cancel-save" to="/dashboard/prisoners" replace color="info">
                    <FontAwesomeIcon icon="arrow-left"/>
                    &nbsp;
                    <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
                  </Button>
                  &nbsp;
                  <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save"/>
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </Button>
                </AvForm>
              )}
            </CardBody>
          </Card>
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
  setBlob,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisonerUpdate);
