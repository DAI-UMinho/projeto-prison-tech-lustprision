import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './login.reducer';
import { ILogin } from 'app/shared/model/login.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoginDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LoginDetail = (props: ILoginDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { loginEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.login.detail.title">Login</Translate> [<b>{loginEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userName">
              <Translate contentKey="lustPrisionApp.login.userName">User Name</Translate>
            </span>
          </dt>
          <dd>{loginEntity.userName}</dd>
          <dt>
            <span id="possword">
              <Translate contentKey="lustPrisionApp.login.possword">Possword</Translate>
            </span>
          </dt>
          <dd>{loginEntity.possword}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="lustPrisionApp.login.type">Type</Translate>
            </span>
          </dt>
          <dd>{loginEntity.type}</dd>
        </dl>
        <Button tag={Link} to="/login" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/login/${loginEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ login }: IRootState) => ({
  loginEntity: login.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoginDetail);
