import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
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
            <span id="password">
              <Translate contentKey="lustPrisionApp.adminEmploy.password">Password</Translate>
            </span>
          </dt>
          <dd>{adminEmployEntity.password}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.adminEmploy.login">Login</Translate>
          </dt>
          <dd>{adminEmployEntity.login ? adminEmployEntity.login.id : ''}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.adminEmploy.permission">Permission</Translate>
          </dt>
          <dd>{adminEmployEntity.permission ? adminEmployEntity.permission.id : ''}</dd>
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
