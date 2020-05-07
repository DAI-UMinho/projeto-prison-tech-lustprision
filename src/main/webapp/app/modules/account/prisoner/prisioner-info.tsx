import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle} from 'reactstrap';
import {Translate, translate, setFileData, openFile} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {createEntity, getEntity, reset, setBlob, updateEntity} from './prisioner.reducer';
import {CircularProgress} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import RefreshIcon from '@material-ui/icons/Refresh';

export interface IPrisionerInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string  }> {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spinner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    eyeButton:{
      margin: '8px',
      '&:hover': {
        color: "#141415",
        cursor: 'pointer'
      }
    }
  }));

export const PrisionerInfo = (props: IPrisionerInfoProps) => {
  const classes = useStyles();
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [password, setPassword] = useState('');
  const [eyeActive, setEyeActive] = useState(false);

  const {prisionerEntity, loading, updating} = props;
  const {profileImage, profileImageContentType} = prisionerEntity;

  const [nfcCode, setNfcCode] = useState(isNew? '' : prisionerEntity.nfcCode);

  const updatePassword = event => setPassword(event.target.value);

  const passwordType = eyeActive ? "text" : "password";
  const eyeColor = eyeActive ? 'inherit' : 'action';

  const eyeClick = () => setEyeActive(!eyeActive);

  const generateNFC = () => setNfcCode(Math.random().toString().slice(2,12));

  const handleClose = () => {
    props.history.push('/dashboard/prisoners');
  };

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
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
              <CircularProgress color="secondary" className={classes.spinner}/>
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
                  <AvField id="prisioner-bi" type="number" className="form-control" name="bi"
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
                  <Translate contentKey="lustPrisionApp.prisioner.nfcCode">NFC Code</Translate>
                  <Row>
                    <Col xs="12" sm="11">
                      <AvField id="prisioner-nfcCode" type="text" className="form-control" name="nfcCode"
                               value={nfcCode}
                               validate={{
                                 number: true,
                                 required: {
                                   value: true,
                                   errorMessage: translate('lustPrisionApp.prisioner.validation.bi.required')
                                 },
                                 minLength: {
                                   value: 10,
                                   errorMessage: translate('lustPrisionApp.prisioner.validation.bi.length')
                                 },
                                 maxLength: {
                                   value: 12,
                                   errorMessage: translate('lustPrisionApp.prisioner.validation.bi.length')
                                 }
                               }}/>
                    </Col>
                    <RefreshIcon onClick={generateNFC} className={classes.eyeButton} />
                  </Row>
                </AvGroup>
                <AvGroup>
                  <Translate contentKey="lustPrisionApp.prisioner.pinCode">PIN</Translate>
                  <Row>
                    <Col xs="12" sm="11">
                      <AvField id="prisioner-pin" type={passwordType} name="codigoCartao"
                               validate={{
                                 number: true,
                                 required: {
                                   value: true,
                                   errorMessage: translate('global.messages.validate.newpassword.required')
                                 },
                                 minLength: {
                                   value: 4,
                                   errorMessage: translate('global.messages.validate.newpassword.minlength')
                                 },
                                 maxLength: {
                                   value: 4,
                                   errorMessage: translate('global.messages.validate.newpassword.maxlength')
                                 }
                               }}/>
                    </Col>
                    <VisibilityIcon onClick={eyeClick} className={classes.eyeButton} color={eyeColor}/>
                  </Row>
                </AvGroup>
                <AvField id="prisioner-balance" type="hidden" name="balance" value="0"/>
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
  );
};

const mapStateToProps = ({prisioner}: IRootState) => ({
  prisionerEntity: prisioner.entity,
  loading: prisioner.loading,
  updating: prisioner.updating,
  updateSuccess: prisioner.updateSuccess
});

const mapDispatchToProps = {reset, setBlob, updateEntity, createEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerInfo);
