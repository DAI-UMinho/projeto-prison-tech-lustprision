import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './purchase.reducer';
import { IPurchase } from 'app/shared/model/purchase.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Purchase = (props: IPurchaseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { purchaseList, match, loading } = props;
  return (
    <div>
      <h2 id="purchase-heading">
        <Translate contentKey="lustPrisionApp.purchase.home.title">Purchases</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.purchase.home.createLabel">Create new Purchase</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {purchaseList && purchaseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.purchase.idPurchase">Id Purchase</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.purchase.prisionerId">Prisioner Id</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.purchase.prisioner">Prisioner</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {purchaseList.map((purchase, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${purchase.id}`} color="link" size="sm">
                      {purchase.id}
                    </Button>
                  </td>
                  <td>{purchase.idPurchase}</td>
                  <td>{purchase.prisionerId}</td>
                  <td>{purchase.prisioner ? <Link to={`prisioner/${purchase.prisioner.id}`}>{purchase.prisioner.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${purchase.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${purchase.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${purchase.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.purchase.home.notFound">No Purchases found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ purchase }: IRootState) => ({
  purchaseList: purchase.entities,
  loading: purchase.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
