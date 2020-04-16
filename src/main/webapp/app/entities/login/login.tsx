import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './login.reducer';
import { ILogin } from 'app/shared/model/login.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Login = (props: ILoginProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { loginList, match, loading } = props;
  return (
    <div>
      <h2 id="login-heading">
        <Translate contentKey="lustPrisionApp.login.home.title">Logins</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.login.home.createLabel">Create new Login</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {loginList && loginList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.login.userName">User Name</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.login.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.login.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.login.adminEmploy">Admin Employ</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loginList.map((login, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${login.id}`} color="link" size="sm">
                      {login.id}
                    </Button>
                  </td>
                  <td>{login.userName}</td>
                  <td>{login.password}</td>
                  <td>{login.type}</td>
                  <td>{login.adminEmploy ? <Link to={`admin-employ/${login.adminEmploy.id}`}>{login.adminEmploy.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${login.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${login.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${login.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="lustPrisionApp.login.home.notFound">No Logins found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ login }: IRootState) => ({
  loginList: login.entities,
  loading: login.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
