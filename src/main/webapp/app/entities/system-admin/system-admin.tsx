import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './system-admin.reducer';
import { ISystemAdmin } from 'app/shared/model/system-admin.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISystemAdminProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const SystemAdmin = (props: ISystemAdminProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { systemAdminList, match, loading } = props;
  return (
    <div>
      <h2 id="system-admin-heading">
        <Translate contentKey="lustPrisionApp.systemAdmin.home.title">System Admins</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.systemAdmin.home.createLabel">Create new System Admin</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {systemAdminList && systemAdminList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.systemAdmin.idSysAdmin">Id Sys Admin</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.systemAdmin.nameAdmin">Name Admin</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.systemAdmin.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.systemAdmin.login">Login</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.systemAdmin.permission">Permission</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {systemAdminList.map((systemAdmin, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${systemAdmin.id}`} color="link" size="sm">
                      {systemAdmin.id}
                    </Button>
                  </td>
                  <td>{systemAdmin.idSysAdmin}</td>
                  <td>{systemAdmin.nameAdmin}</td>
                  <td>{systemAdmin.password}</td>
                  <td>{systemAdmin.login ? <Link to={`login/${systemAdmin.login.id}`}>{systemAdmin.login.id}</Link> : ''}</td>
                  <td>
                    {systemAdmin.permission ? <Link to={`permission/${systemAdmin.permission.id}`}>{systemAdmin.permission.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${systemAdmin.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${systemAdmin.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${systemAdmin.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.systemAdmin.home.notFound">No System Admins found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ systemAdmin }: IRootState) => ({
  systemAdminList: systemAdmin.entities,
  loading: systemAdmin.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdmin);
