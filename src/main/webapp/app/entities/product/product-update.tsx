import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductUpdate = (props: IProductUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/product');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productEntity,
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
          <h2 id="lustPrisionApp.product.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.product.home.createOrEditLabel">Create or edit a Product</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="product-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeProdLabel" for="product-codeProd">
                  <Translate contentKey="lustPrisionApp.product.codeProd">Code Prod</Translate>
                </Label>
                <AvField id="product-codeProd" type="string" className="form-control" name="codeProd" />
              </AvGroup>
              <AvGroup>
                <Label id="productLinIdLabel" for="product-productLinId">
                  <Translate contentKey="lustPrisionApp.product.productLinId">Product Lin Id</Translate>
                </Label>
                <AvField id="product-productLinId" type="string" className="form-control" name="productLinId" />
              </AvGroup>
              <AvGroup>
                <Label id="nameProdLabel" for="product-nameProd">
                  <Translate contentKey="lustPrisionApp.product.nameProd">Name Prod</Translate>
                </Label>
                <AvField id="product-nameProd" type="text" name="nameProd" />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="product-price">
                  <Translate contentKey="lustPrisionApp.product.price">Price</Translate>
                </Label>
                <AvField id="product-price" type="string" className="form-control" name="price" />
              </AvGroup>
              <AvGroup>
                <Label id="selerLabel" for="product-seler">
                  <Translate contentKey="lustPrisionApp.product.seler">Seler</Translate>
                </Label>
                <AvField id="product-seler" type="text" name="seler" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionProdLabel" for="product-descriptionProd">
                  <Translate contentKey="lustPrisionApp.product.descriptionProd">Description Prod</Translate>
                </Label>
                <AvField id="product-descriptionProd" type="text" name="descriptionProd" />
              </AvGroup>
              <AvGroup>
                <Label id="quantyInStockLabel" for="product-quantyInStock">
                  <Translate contentKey="lustPrisionApp.product.quantyInStock">Quanty In Stock</Translate>
                </Label>
                <AvField id="product-quantyInStock" type="string" className="form-control" name="quantyInStock" />
              </AvGroup>
              <AvGroup>
                <Label id="buyPriceLabel" for="product-buyPrice">
                  <Translate contentKey="lustPrisionApp.product.buyPrice">Buy Price</Translate>
                </Label>
                <AvField id="product-buyPrice" type="string" className="form-control" name="buyPrice" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product" replace color="info">
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
  productEntity: storeState.product.entity,
  loading: storeState.product.loading,
  updating: storeState.product.updating,
  updateSuccess: storeState.product.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);
