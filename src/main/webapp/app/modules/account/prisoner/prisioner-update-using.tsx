import {Link, RouteComponentProps} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {byteSize, openFile, setFileData, translate, Translate} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IRootState} from "app/shared/reducers";
import {getEntities as getLogins} from "app/entities/login/login.reducer";
import {getEntities as getPermissions} from "app/entities/permission/permission.reducer";

import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import { Button, Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import {
  getPrisonerPurchases,
  createEntity,
  getEntity,
  reset,
  setBlob,
  updateEntity,
  getPrisionerWorks
} from "./prisioner.reducer";
import {connect} from "react-redux";
import PasswordStrengthBar from "app/shared/layout/password/password-strength-bar";
import purchase from "app/entities/purchase/purchase";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {blue} from "@material-ui/core/colors";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export interface IPrisionerUpdateProps extends TabPanelProps, StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.white,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  appbar: {
    background: 'transparent',
    boxShadow: 'none',
    color: "#000000"
  },
  table: {
    minWidth: 700,
  },
});

export const PrisonerUpdate = (props: IPrisionerUpdateProps) => {
  const [loginId, setLoginId] = useState('0');
  const [permissionId, setPermissionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [password, setPassword] = useState('');

  const {prisionerEntity, logins, permissions, loading, updating, prisionerPurchases, prisionerWorks} = props;

  const {profileImage, profileImageContentType} = prisionerEntity;

  const [value, setValue] = React.useState(0);
  const [purchaseData, setPurchaseData] = useState([]);
  const [workData, setWorkData] = useState([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const updatePassword = event => setPassword(event.target.value);

  const handleClose = () => {
    props.history.push('/dashboard/prisoners');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
      props.getPrisonerPurchases(props.match.params.id);
      props.getPrisionerWorks(props.match.params.id);
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

  useEffect(() => {
    if (props.prisionerPurchases && props.prisionerPurchases.length > 0) {
      setPurchaseData(props.prisionerPurchases);
    }
  }, [props.prisionerPurchases]);

  useEffect(() => {
    if (props.prisionerWorks && props.prisionerWorks.length > 0) {
      setWorkData(props.prisionerWorks);
    }
  }, [props.prisionerWorks]);

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

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appbar} position="static">
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {
            backgroundColor: "#2196f3"}}} aria-label="simple tabs example">
          <Tab label="Dados Pessoais" {...a11yProps(0)} />
          <Tab label="Compras" {...a11yProps(1)} />
          <Tab label="Trabalhos" {...a11yProps(2)} />
          <Tab label="Quizes" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="card-user justify-content-center">
              <CardHeader>
                <CardTitle tag="h5">Todas as compras</CardTitle>
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Numero de Compra</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {purchaseData.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.id}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
{/*                {prisionerPurchases && prisionerPurchases.length > 0 ?
                  prisionerPurchases.map(purc => (<div><h2>{purc.id}</h2><h4>{purc.prisionerId}</h4></div>))
                 : (<h1>NOTHING</h1>)}*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Row className="justify-content-center">
          <Col md="8">
            <Card className="card-user justify-content-center">
              <CardHeader>
                <CardTitle tag="h5">Todas os Trabalhos</CardTitle>
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Numero de Trabalho</StyledTableCell>
                        <StyledTableCell>Nome do Trabalho</StyledTableCell>
                        <StyledTableCell>Preço Hora</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {workData.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">{row.nameWork}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">{row.priceHour}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/*                {prisionerPurchases && prisionerPurchases.length > 0 ?
                  prisionerPurchases.map(purc => (<div><h2>{purc.id}</h2><h4>{purc.prisionerId}</h4></div>))
                 : (<h1>NOTHING</h1>)}*/}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  logins: storeState.login.entities,
  permissions: storeState.permission.entities,
  prisionerEntity: storeState.prisioner.entity,
  prisionerPurchases: storeState.prisioner.purchases,
  prisionerWorks: storeState.prisioner.works,
  loading: storeState.prisioner.loading,
  updating: storeState.prisioner.updating,
  updateSuccess: storeState.prisioner.updateSuccess,

});

const mapDispatchToProps = {
  getLogins,
  getPermissions,
  getEntity,
  setBlob,
  updateEntity,
  createEntity,
  getPrisonerPurchases,
  getPrisionerWorks,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisonerUpdate);
