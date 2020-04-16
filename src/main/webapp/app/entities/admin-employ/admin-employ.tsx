import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './admin-employ.reducer';
import { IAdminEmploy } from 'app/shared/model/admin-employ.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdminEmployProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AdminEmploy = (props: IAdminEmployProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { adminEmployList, match, loading } = props;
  return (
    <div>
      <h2 id="admin-employ-heading">
        <Translate contentKey="lustPrisionApp.adminEmploy.home.title">Admin Employs</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.adminEmploy.home.createLabel">Create new Admin Employ</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {adminEmployList && adminEmployList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.adminEmploy.nameAdminEmp">Name Admin Emp</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.adminEmploy.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.adminEmploy.activated">Activated</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.adminEmploy.actitionKey">Actition Key</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.adminEmploy.resetKey">Reset Key</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.adminEmploy.resetDate">Reset Date</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adminEmployList.map((adminEmploy, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${adminEmploy.id}`} color="link" size="sm">
                      {adminEmploy.id}
                    </Button>
                  </td>
                  <td>{adminEmploy.nameAdminEmp}</td>
                  <td>{adminEmploy.email}</td>
                  <td>{adminEmploy.activated ? 'true' : 'false'}</td>
                  <td>{adminEmploy.actitionKey}</td>
                  <td>{adminEmploy.resetKey}</td>
                  <td>
                    <TextFormat type="date" value={adminEmploy.resetDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${adminEmploy.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${adminEmploy.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${adminEmploy.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.adminEmploy.home.notFound">No Admin Employs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adminEmploy }: IRootState) => ({
  adminEmployList: adminEmploy.entities,
  loading: adminEmploy.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdminEmploy);
