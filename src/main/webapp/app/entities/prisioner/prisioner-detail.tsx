import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prisioner.reducer';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrisionerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrisionerDetail = (props: IPrisionerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prisionerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.prisioner.detail.title">Prisioner</Translate> [<b>{prisionerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idPrisioner">
              <Translate contentKey="lustPrisionApp.prisioner.idPrisioner">Id Prisioner</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.idPrisioner}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="lustPrisionApp.prisioner.name">Name</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.name}</dd>
          <dt>
            <span id="bi">
              <Translate contentKey="lustPrisionApp.prisioner.bi">Bi</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.bi}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="lustPrisionApp.prisioner.image">Image</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.image}</dd>
          <dt>
            <span id="numPrisioner">
              <Translate contentKey="lustPrisionApp.prisioner.numPrisioner">Num Prisioner</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.numPrisioner}</dd>
          <dt>
            <span id="numCell">
              <Translate contentKey="lustPrisionApp.prisioner.numCell">Num Cell</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.numCell}</dd>
          <dt>
            <span id="dataNascimento">
              <Translate contentKey="lustPrisionApp.prisioner.dataNascimento">Data Nascimento</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={prisionerEntity.dataNascimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="balance">
              <Translate contentKey="lustPrisionApp.prisioner.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.balance}</dd>
          <dt>
            <span id="working">
              <Translate contentKey="lustPrisionApp.prisioner.working">Working</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.working}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="lustPrisionApp.prisioner.password">Password</Translate>
            </span>
          </dt>
          <dd>{prisionerEntity.password}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.prisioner.login">Login</Translate>
          </dt>
          <dd>{prisionerEntity.login ? prisionerEntity.login.id : ''}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.prisioner.permission">Permission</Translate>
          </dt>
          <dd>{prisionerEntity.permission ? prisionerEntity.permission.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/prisioner" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prisioner/${prisionerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prisioner }: IRootState) => ({
  prisionerEntity: prisioner.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerDetail);
