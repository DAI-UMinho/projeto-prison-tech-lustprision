import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPrisioner } from 'app/shared/model/prisioner.model';
import { getEntities as getPrisioners } from 'app/entities/prisioner/prisioner.reducer';
import { getEntity, updateEntity, createEntity, reset } from './purchase.reducer';
import { IPurchase } from 'app/shared/model/purchase.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPurchaseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseUpdate = (props: IPurchaseUpdateProps) => {
  const [prisionerId, setPrisionerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { purchaseEntity, prisioners, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/purchase');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPrisioners();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...purchaseEntity,
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
          <h2 id="lustPrisionApp.purchase.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.purchase.home.createOrEditLabel">Create or edit a Purchase</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : purchaseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="purchase-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="purchase-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idPurchaseLabel" for="purchase-idPurchase">
                  <Translate contentKey="lustPrisionApp.purchase.idPurchase">Id Purchase</Translate>
                </Label>
                <AvField id="purchase-idPurchase" type="string" className="form-control" name="idPurchase" />
              </AvGroup>
              <AvGroup>
                <Label for="purchase-prisioner">
                  <Translate contentKey="lustPrisionApp.purchase.prisioner">Prisioner</Translate>
                </Label>
                <AvInput id="purchase-prisioner" type="select" className="form-control" name="prisioner.id">
                  <option value="" key="0" />
                  {prisioners
                    ? prisioners.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/purchase" replace color="info">
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
  prisioners: storeState.prisioner.entities,
  purchaseEntity: storeState.purchase.entity,
  loading: storeState.purchase.loading,
  updating: storeState.purchase.updating,
  updateSuccess: storeState.purchase.updateSuccess
});

const mapDispatchToProps = {
  getPrisioners,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseUpdate);
