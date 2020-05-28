import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {makeStyles, withStyles, createStyles, Theme, useTheme} from '@material-ui/core/styles';
import {openFile, setFileData, Translate} from 'react-jhipster';
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';

import {getUser, updateUser, setBlob} from './user-management.reducer';
import {IRootState} from 'app/shared/reducers';
import {useMediaQuery} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{login}> {
}

export const EmployeeInfo = (props: IUserManagementProps) => {
  const theme = useTheme();
  const mCol = useMediaQuery(theme.breakpoints.down('lg')) ? 12 : 10;

  const {employee, updating, match, totalItems, loading} = props;
  const {profileImage, profileImageContentType} = employee;

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, '', '');
  };

  const doUpdate = () => {
    props.updateUser(
      {... employee}
    )
  };

  useEffect(() => {
    props.getUser(props.match.params.login)
  }, []);

  console.log(profileImage);
  return (
    <Row className="justify-content-center">
      <Col md="8">
        <Card className="card-user justify-content-center">
          <CardHeader>
            <CardTitle tag="h5">Funcionário</CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? null : (
              <AvForm model={employee} onSubmit={doUpdate}>
                <div className="profile-wrap">
                  {profileImage ? (
                    <div>
                      <a>
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
                  <Label for="employee-login">
                    <Translate contentKey="global.field.username">ID</Translate>
                  </Label>
                  <AvInput id="employee-login" type="text" className="form-control" name="login" required readOnly/>
                </AvGroup>
                <div className="row">
                  <div className="pr-1 col-md-6">
                    <Label id="firstNameLabel" for="employee-firstName">
                      {/*<Translate contentKey="lustPrisionApp.work.nameWork">Name Work</Translate>*/}
                      First Name
                    </Label>
                    <AvField id="employee-firstName" type="text" name="firstName"/>
                  </div>
                  <div className="pr-1 col-md-6">
                    <Label id="priceHourLabel" for="work-priceHour">
                      Last Name
                    </Label>
                    <AvField id="work-priceHour" type="string" className="form-control" name="lastName"/>
                  </div>
                </div>
                <AvGroup>
                  <Label id="numVacanciesLabel" for="work-numVacancies">
                    Email
                  </Label>
                  <AvField id="work-numVacancies" type="string" className="form-control" name="email"/>
                </AvGroup>
                <AvGroup check>
                  <Label>
                    <AvInput type="checkbox" name="activated" value={employee.activated} checked={employee.activated} disabled={!employee.id} />{' '}
                    <Translate contentKey="userManagement.activated">Activated</Translate>
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" onClick={() => props.history.goBack()} replace color="info">
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

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  employee: storeState.userManagement.user,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  updating : storeState.userManagement.updating
});

const mapDispatchToProps = {getUser, updateUser, setBlob};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfo);
