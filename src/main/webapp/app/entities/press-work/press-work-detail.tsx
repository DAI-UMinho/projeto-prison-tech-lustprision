import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './press-work.reducer';
import { IPressWork } from 'app/shared/model/press-work.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPressWorkDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PressWorkDetail = (props: IPressWorkDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pressWorkEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.pressWork.detail.title">PressWork</Translate> [<b>{pressWorkEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="prisionerId">
              <Translate contentKey="lustPrisionApp.pressWork.prisionerId">Prisioner Id</Translate>
            </span>
          </dt>
          <dd>{pressWorkEntity.prisionerId}</dd>
          <dt>
            <span id="workId">
              <Translate contentKey="lustPrisionApp.pressWork.workId">Work Id</Translate>
            </span>
          </dt>
          <dd>{pressWorkEntity.workId}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.pressWork.idWork">Id Work</Translate>
          </dt>
          <dd>{pressWorkEntity.idWork ? pressWorkEntity.idWork.id : ''}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.pressWork.prisioner">Prisioner</Translate>
          </dt>
          <dd>{pressWorkEntity.prisioner ? pressWorkEntity.prisioner.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/press-work" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/press-work/${pressWorkEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pressWork }: IRootState) => ({
  pressWorkEntity: pressWork.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PressWorkDetail);
