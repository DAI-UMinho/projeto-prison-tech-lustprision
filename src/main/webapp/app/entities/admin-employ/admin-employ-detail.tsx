import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './admin-employ.reducer';
import { IAdminEmploy } from 'app/shared/model/admin-employ.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdminEmployDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdminEmployDetail = (props: IAdminEmployDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { adminEmployEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.adminEmploy.detail.title">AdminEmploy</Translate> [<b>{adminEmployEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nameAdminEmp">
              <Translate contentKey="lustPrisionApp.adminEmploy.nameAdminEmp">Name Admin Emp</Translate>
            </span>
          </dt>
          <dd>{adminEmployEntity.nameAdminEmp}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="lustPrisionApp.adminEmploy.email">Email</Translate>
            </span>
          </dt>
          <dd>{adminEmployEntity.email}</dd>
          <dt>
            <span id="activated">
              <Translate contentKey="lustPrisionApp.adminEmploy.activated">Activated</Translate>
            </span>
          </dt>
          <dd>{adminEmployEntity.activated ? 'true' : 'false'}</dd>
          <dt>
            <span id="actitionKey">
              <Translate contentKey="lustPrisionApp.adminEmploy.actitionKey">Actition Key</Translate>
            </span>
          </dt>
          <dd>{adminEmployEntity.actitionKey}</dd>
          <dt>
            <span id="resetKey">
              <Translate contentKey="lustPrisionApp.adminEmploy.resetKey">Reset Key</Translate>
            </span>
          </dt>
          <dd>{adminEmployEntity.resetKey}</dd>
          <dt>
            <span id="resetDate">
              <Translate contentKey="lustPrisionApp.adminEmploy.resetDate">Reset Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={adminEmployEntity.resetDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
        </dl>
        <Button tag={Link} to="/admin-employ" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/admin-employ/${adminEmployEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ adminEmploy }: IRootState) => ({
  adminEmployEntity: adminEmploy.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdminEmployDetail);
