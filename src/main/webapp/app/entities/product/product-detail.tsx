import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductDetail = (props: IProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.product.detail.title">Product</Translate> [<b>{productEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="productLinId">
              <Translate contentKey="lustPrisionApp.product.productLinId">Product Lin Id</Translate>
            </span>
          </dt>
          <dd>{productEntity.productLinId}</dd>
          <dt>
            <span id="nameProd">
              <Translate contentKey="lustPrisionApp.product.nameProd">Name Prod</Translate>
            </span>
          </dt>
          <dd>{productEntity.nameProd}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="lustPrisionApp.product.price">Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.price}</dd>
          <dt>
            <span id="seler">
              <Translate contentKey="lustPrisionApp.product.seler">Seler</Translate>
            </span>
          </dt>
          <dd>{productEntity.seler}</dd>
          <dt>
            <span id="descriptionProd">
              <Translate contentKey="lustPrisionApp.product.descriptionProd">Description Prod</Translate>
            </span>
          </dt>
          <dd>{productEntity.descriptionProd}</dd>
          <dt>
            <span id="quantyInStock">
              <Translate contentKey="lustPrisionApp.product.quantyInStock">Quanty In Stock</Translate>
            </span>
          </dt>
          <dd>{productEntity.quantyInStock}</dd>
          <dt>
            <span id="buyPrice">
              <Translate contentKey="lustPrisionApp.product.buyPrice">Buy Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.buyPrice}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ product }: IRootState) => ({
  productEntity: product.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
