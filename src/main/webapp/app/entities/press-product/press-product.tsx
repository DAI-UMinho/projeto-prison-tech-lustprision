import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './press-product.reducer';
import { IPressProduct } from 'app/shared/model/press-product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPressProductProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PressProduct = (props: IPressProductProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { pressProductList, match, loading } = props;
  return (
    <div>
      <h2 id="press-product-heading">
        <Translate contentKey="lustPrisionApp.pressProduct.home.title">Press Products</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.pressProduct.home.createLabel">Create new Press Product</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {pressProductList && pressProductList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressProduct.orderId">Order Id</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressProduct.productCode">Product Code</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressProduct.quaty">Quaty</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressProduct.priceEach">Price Each</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressProduct.purchaseIdPurchase">Purchase Id Purchase</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressProduct.idPrisioner">Id Prisioner</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressProduct.idProduct">Id Product</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pressProductList.map((pressProduct, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pressProduct.id}`} color="link" size="sm">
                      {pressProduct.id}
                    </Button>
                  </td>
                  <td>{pressProduct.orderId}</td>
                  <td>{pressProduct.productCode}</td>
                  <td>{pressProduct.quaty}</td>
                  <td>{pressProduct.priceEach}</td>
                  <td>{pressProduct.purchaseIdPurchase}</td>
                  <td>
                    {pressProduct.idPrisioner ? (
                      <Link to={`purchase/${pressProduct.idPrisioner.id}`}>{pressProduct.idPrisioner.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {pressProduct.idProduct ? <Link to={`product/${pressProduct.idProduct.id}`}>{pressProduct.idProduct.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pressProduct.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pressProduct.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pressProduct.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.pressProduct.home.notFound">No Press Products found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ pressProduct }: IRootState) => ({
  pressProductList: pressProduct.entities,
  loading: pressProduct.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PressProduct);
