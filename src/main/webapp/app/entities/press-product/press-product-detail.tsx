import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './press-product.reducer';
import { IPressProduct } from 'app/shared/model/press-product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPressProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PressProductDetail = (props: IPressProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pressProductEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.pressProduct.detail.title">PressProduct</Translate> [<b>{pressProductEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="orderId">
              <Translate contentKey="lustPrisionApp.pressProduct.orderId">Order Id</Translate>
            </span>
          </dt>
          <dd>{pressProductEntity.orderId}</dd>
          <dt>
            <span id="qty">
              <Translate contentKey="lustPrisionApp.pressProduct.qty">Qty</Translate>
            </span>
          </dt>
          <dd>{pressProductEntity.qty}</dd>
          <dt>
            <span id="priceEach">
              <Translate contentKey="lustPrisionApp.pressProduct.priceEach">Price Each</Translate>
            </span>
          </dt>
          <dd>{pressProductEntity.priceEach}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.pressProduct.purchase">Purchase</Translate>
          </dt>
          <dd>{pressProductEntity.purchase ? pressProductEntity.purchase.id : ''}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.pressProduct.product">Product</Translate>
          </dt>
          <dd>{pressProductEntity.product ? pressProductEntity.product.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/press-product" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/press-product/${pressProductEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pressProduct }: IRootState) => ({
  pressProductEntity: pressProduct.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PressProductDetail);
