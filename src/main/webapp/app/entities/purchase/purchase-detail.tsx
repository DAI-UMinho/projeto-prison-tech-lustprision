import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './purchase.reducer';
import { IPurchase } from 'app/shared/model/purchase.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPurchaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PurchaseDetail = (props: IPurchaseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { purchaseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.purchase.detail.title">Purchase</Translate> [<b>{purchaseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="date">
              <Translate contentKey="lustPrisionApp.purchase.date">Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={purchaseEntity.date} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="purchaseTotal">
              <Translate contentKey="lustPrisionApp.purchase.purchaseTotal">Purchase Total</Translate>
            </span>
          </dt>
          <dd>{purchaseEntity.purchaseTotal}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.purchase.prisioner">Prisioner</Translate>
          </dt>
          <dd>{purchaseEntity.prisionerId ? purchaseEntity.prisionerId : ''}</dd>
        </dl>
        <Button tag={Link} to="/purchase" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/purchase/${purchaseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ purchase }: IRootState) => ({
  purchaseEntity: purchase.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseDetail);
