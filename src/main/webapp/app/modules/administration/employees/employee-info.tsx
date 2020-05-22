import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {makeStyles, withStyles, createStyles, Theme, useTheme} from '@material-ui/core/styles';
import {Translate} from 'react-jhipster';
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';

import {getUser, updateUser} from './user-management.reducer';
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

  const classes = useStyles();
  const {employee, updating, match, totalItems} = props;

  const doUpdate = () => {
    props.updateUser(
      {... employee}
    )
  };

  useEffect(() => {
    props.getUser(props.match.params.login)
  }, []);

  console.log("HA");
  console.log(employee);

  return (
    <div>
      <AvForm model={employee} onSubmit={doUpdate}>
        <AvGroup>
          <Label for="employee-login">
            <Translate contentKey="global.field.id">ID</Translate>
          </Label>
          <AvInput id="employee-login" type="text" className="form-control" name="login" required readOnly/>
        </AvGroup>
        <AvGroup>
          <Label id="firstNameLabel" for="employee-firstName">
            {/*<Translate contentKey="lustPrisionApp.work.nameWork">Name Work</Translate>*/}
            First Name
          </Label>
          <AvField id="employee-firstName" type="text" name="firstName"/>
        </AvGroup>
        <AvGroup>
          <Label id="priceHourLabel" for="work-priceHour">
            Last Name
          </Label>
          <AvField id="work-priceHour" type="string" className="form-control" name="lastName"/>
        </AvGroup>
        <AvGroup>
          <Label id="numVacanciesLabel" for="work-numVacancies">
            Email
          </Label>
          <AvField id="work-numVacancies" type="string" className="form-control" name="email"/>
        </AvGroup>
        <AvGroup>
          <Label id="dateLabel" for="work-date">
            <Translate contentKey="lustPrisionApp.work.date">Date</Translate>
          </Label>
          <AvField id="work-date" type="date" className="form-control" name="date"/>
        </AvGroup>
        <Button tag={Link} id="cancel-save" onClick={null} replace color="info">
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
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  employee: storeState.userManagement.user,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
  updating : storeState.userManagement.updating
});

const mapDispatchToProps = {getUser, updateUser};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfo);
