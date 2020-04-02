import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPurchase } from 'app/shared/model/purchase.model';
import { getEntities as getPurchases } from 'app/entities/purchase/purchase.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { getEntity, updateEntity, createEntity, reset } from './press-product.reducer';
import { IPressProduct } from 'app/shared/model/press-product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPressProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PressProductUpdate = (props: IPressProductUpdateProps) => {
  const [purchaseId, setPurchaseId] = useState('0');
  const [productId, setProductId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pressProductEntity, purchases, products, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/press-product');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPurchases();
    props.getProducts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pressProductEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lustPrisionApp.pressProduct.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.pressProduct.home.createOrEditLabel">Create or edit a PressProduct</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pressProductEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="press-product-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="press-product-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="qtyLabel" for="press-product-qty">
                  <Translate contentKey="lustPrisionApp.pressProduct.qty">Qty</Translate>
                </Label>
                <AvField id="press-product-qty" type="string" className="form-control" name="qty" />
              </AvGroup>
              <AvGroup>
                <Label id="priceEachLabel" for="press-product-priceEach">
                  <Translate contentKey="lustPrisionApp.pressProduct.priceEach">Price Each</Translate>
                </Label>
                <AvField id="press-product-priceEach" type="string" className="form-control" name="priceEach" />
              </AvGroup>
              <AvGroup>
                <Label for="press-product-purchase">
                  <Translate contentKey="lustPrisionApp.pressProduct.purchase">Purchase</Translate>
                </Label>
                <AvInput id="press-product-purchase" type="select" className="form-control" name="purchase.id">
                  <option value="" key="0" />
                  {purchases
                    ? purchases.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="press-product-product">
                  <Translate contentKey="lustPrisionApp.pressProduct.product">Product</Translate>
                </Label>
                <AvInput id="press-product-product" type="select" className="form-control" name="product.id">
                  <option value="" key="0" />
                  {products
                    ? products.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/press-product" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  purchases: storeState.purchase.entities,
  products: storeState.product.entities,
  pressProductEntity: storeState.pressProduct.entity,
  loading: storeState.pressProduct.loading,
  updating: storeState.pressProduct.updating,
  updateSuccess: storeState.pressProduct.updateSuccess
});

const mapDispatchToProps = {
  getPurchases,
  getProducts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PressProductUpdate);
