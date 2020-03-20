import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './permission.reducer';
import { IPermission } from 'app/shared/model/permission.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPermissionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PermissionDetail = (props: IPermissionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { permissionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.permission.detail.title">Permission</Translate> [<b>{permissionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idPermission">
              <Translate contentKey="lustPrisionApp.permission.idPermission">Id Permission</Translate>
            </span>
          </dt>
          <dd>{permissionEntity.idPermission}</dd>
          <dt>
            <span id="descPermission">
              <Translate contentKey="lustPrisionApp.permission.descPermission">Desc Permission</Translate>
            </span>
          </dt>
          <dd>{permissionEntity.descPermission}</dd>
        </dl>
        <Button tag={Link} to="/permission" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/permission/${permissionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ permission }: IRootState) => ({
  permissionEntity: permission.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PermissionDetail);
