import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './work.reducer';
import { IWork } from 'app/shared/model/work.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWorkDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkDetail = (props: IWorkDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { workEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.work.detail.title">Work</Translate> [<b>{workEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nameWork">
              <Translate contentKey="lustPrisionApp.work.nameWork">Name Work</Translate>
            </span>
          </dt>
          <dd>{workEntity.nameWork}</dd>
          <dt>
            <span id="priceHour">
              <Translate contentKey="lustPrisionApp.work.priceHour">Price Hour</Translate>
            </span>
          </dt>
          <dd>{workEntity.priceHour}</dd>
          <dt>
            <span id="numVacancies">
              <Translate contentKey="lustPrisionApp.work.numVacancies">Num Vacancies</Translate>
            </span>
          </dt>
          <dd>{workEntity.numVacancies}</dd>
        </dl>
        <Button tag={Link} to="/work" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/work/${workEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ work }: IRootState) => ({
  workEntity: work.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkDetail);
