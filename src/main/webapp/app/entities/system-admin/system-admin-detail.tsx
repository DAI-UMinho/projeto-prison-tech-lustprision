import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './system-admin.reducer';
import { ISystemAdmin } from 'app/shared/model/system-admin.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISystemAdminDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SystemAdminDetail = (props: ISystemAdminDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { systemAdminEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.systemAdmin.detail.title">SystemAdmin</Translate> [<b>{systemAdminEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nameAdmin">
              <Translate contentKey="lustPrisionApp.systemAdmin.nameAdmin">Name Admin</Translate>
            </span>
          </dt>
          <dd>{systemAdminEntity.nameAdmin}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="lustPrisionApp.systemAdmin.password">Password</Translate>
            </span>
          </dt>
          <dd>{systemAdminEntity.password}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.systemAdmin.login">Login</Translate>
          </dt>
          <dd>{systemAdminEntity.login ? systemAdminEntity.login.id : ''}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.systemAdmin.permission">Permission</Translate>
          </dt>
          <dd>{systemAdminEntity.permission ? systemAdminEntity.permission.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/system-admin" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/system-admin/${systemAdminEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ systemAdmin }: IRootState) => ({
  systemAdminEntity: systemAdmin.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SystemAdminDetail);
