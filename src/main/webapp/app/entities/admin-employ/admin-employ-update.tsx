import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './admin-employ.reducer';
import { IAdminEmploy } from 'app/shared/model/admin-employ.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAdminEmployUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdminEmployUpdate = (props: IAdminEmployUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { adminEmployEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/admin-employ');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.resetDate = convertDateTimeToServer(values.resetDate);

    if (errors.length === 0) {
      const entity = {
        ...adminEmployEntity,
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
          <h2 id="lustPrisionApp.adminEmploy.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.adminEmploy.home.createOrEditLabel">Create or edit a AdminEmploy</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : adminEmployEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="admin-employ-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="admin-employ-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameAdminEmpLabel" for="admin-employ-nameAdminEmp">
                  <Translate contentKey="lustPrisionApp.adminEmploy.nameAdminEmp">Name Admin Emp</Translate>
                </Label>
                <AvField id="admin-employ-nameAdminEmp" type="text" name="nameAdminEmp" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="admin-employ-email">
                  <Translate contentKey="lustPrisionApp.adminEmploy.email">Email</Translate>
                </Label>
                <AvField
                  id="admin-employ-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: {
                      value: '^[a-zA-Z0-9]*$',
                      errorMessage: translate('entity.validation.pattern', { pattern: '^[a-zA-Z0-9]*$' })
                    }
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="activatedLabel">
                  <AvInput id="admin-employ-activated" type="checkbox" className="form-check-input" name="activated" />
                  <Translate contentKey="lustPrisionApp.adminEmploy.activated">Activated</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="actitionKeyLabel" for="admin-employ-actitionKey">
                  <Translate contentKey="lustPrisionApp.adminEmploy.actitionKey">Actition Key</Translate>
                </Label>
                <AvField
                  id="admin-employ-actitionKey"
                  type="text"
                  name="actitionKey"
                  validate={{
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="resetKeyLabel" for="admin-employ-resetKey">
                  <Translate contentKey="lustPrisionApp.adminEmploy.resetKey">Reset Key</Translate>
                </Label>
                <AvField
                  id="admin-employ-resetKey"
                  type="text"
                  name="resetKey"
                  validate={{
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="resetDateLabel" for="admin-employ-resetDate">
                  <Translate contentKey="lustPrisionApp.adminEmploy.resetDate">Reset Date</Translate>
                </Label>
                <AvInput
                  id="admin-employ-resetDate"
                  type="datetime-local"
                  className="form-control"
                  name="resetDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.adminEmployEntity.resetDate)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/admin-employ" replace color="info">
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
  adminEmployEntity: storeState.adminEmploy.entity,
  loading: storeState.adminEmploy.loading,
  updating: storeState.adminEmploy.updating,
  updateSuccess: storeState.adminEmploy.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdminEmployUpdate);
