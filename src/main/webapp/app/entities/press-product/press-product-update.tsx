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
  const [idPrisionerId, setIdPrisionerId] = useState('0');
  const [idProductId, setIdProductId] = useState('0');
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
                <Label id="orderIdLabel" for="press-product-orderId">
                  <Translate contentKey="lustPrisionApp.pressProduct.orderId">Order Id</Translate>
                </Label>
                <AvField id="press-product-orderId" type="string" className="form-control" name="orderId" />
              </AvGroup>
              <AvGroup>
                <Label id="productCodeLabel" for="press-product-productCode">
                  <Translate contentKey="lustPrisionApp.pressProduct.productCode">Product Code</Translate>
                </Label>
                <AvField id="press-product-productCode" type="string" className="form-control" name="productCode" />
              </AvGroup>
              <AvGroup>
                <Label id="quatyLabel" for="press-product-quaty">
                  <Translate contentKey="lustPrisionApp.pressProduct.quaty">Quaty</Translate>
                </Label>
                <AvField id="press-product-quaty" type="string" className="form-control" name="quaty" />
              </AvGroup>
              <AvGroup>
                <Label id="priceEachLabel" for="press-product-priceEach">
                  <Translate contentKey="lustPrisionApp.pressProduct.priceEach">Price Each</Translate>
                </Label>
                <AvField id="press-product-priceEach" type="string" className="form-control" name="priceEach" />
              </AvGroup>
              <AvGroup>
                <Label id="purchaseIdPurchaseLabel" for="press-product-purchaseIdPurchase">
                  <Translate contentKey="lustPrisionApp.pressProduct.purchaseIdPurchase">Purchase Id Purchase</Translate>
                </Label>
                <AvField id="press-product-purchaseIdPurchase" type="string" className="form-control" name="purchaseIdPurchase" />
              </AvGroup>
              <AvGroup>
                <Label for="press-product-idPrisioner">
                  <Translate contentKey="lustPrisionApp.pressProduct.idPrisioner">Id Prisioner</Translate>
                </Label>
                <AvInput id="press-product-idPrisioner" type="select" className="form-control" name="idPrisioner.id">
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
                <Label for="press-product-idProduct">
                  <Translate contentKey="lustPrisionApp.pressProduct.idProduct">Id Product</Translate>
                </Label>
                <AvInput id="press-product-idProduct" type="select" className="form-control" name="idProduct.id">
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
