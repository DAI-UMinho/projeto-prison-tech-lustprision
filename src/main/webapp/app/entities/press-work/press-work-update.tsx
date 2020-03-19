import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWork } from 'app/shared/model/work.model';
import { getEntities as getWorks } from 'app/entities/work/work.reducer';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { getEntities as getPrisioners } from 'app/entities/prisioner/prisioner.reducer';
import { getEntity, updateEntity, createEntity, reset } from './press-work.reducer';
import { IPressWork } from 'app/shared/model/press-work.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPressWorkUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PressWorkUpdate = (props: IPressWorkUpdateProps) => {
  const [idWorkId, setIdWorkId] = useState('0');
  const [prisionerId, setPrisionerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pressWorkEntity, works, prisioners, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/press-work');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWorks();
    props.getPrisioners();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...pressWorkEntity,
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
          <h2 id="lustPrisionApp.pressWork.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.pressWork.home.createOrEditLabel">Create or edit a PressWork</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pressWorkEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="press-work-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="press-work-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="prisionerIdLabel" for="press-work-prisionerId">
                  <Translate contentKey="lustPrisionApp.pressWork.prisionerId">Prisioner Id</Translate>
                </Label>
                <AvField id="press-work-prisionerId" type="string" className="form-control" name="prisionerId" />
              </AvGroup>
              <AvGroup>
                <Label id="workIdLabel" for="press-work-workId">
                  <Translate contentKey="lustPrisionApp.pressWork.workId">Work Id</Translate>
                </Label>
                <AvField id="press-work-workId" type="string" className="form-control" name="workId" />
              </AvGroup>
              <AvGroup>
                <Label for="press-work-idWork">
                  <Translate contentKey="lustPrisionApp.pressWork.idWork">Id Work</Translate>
                </Label>
                <AvInput id="press-work-idWork" type="select" className="form-control" name="idWork.id">
                  <option value="" key="0" />
                  {works
                    ? works.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="press-work-prisioner">
                  <Translate contentKey="lustPrisionApp.pressWork.prisioner">Prisioner</Translate>
                </Label>
                <AvInput id="press-work-prisioner" type="select" className="form-control" name="prisioner.id">
                  <option value="" key="0" />
                  {prisioners
                    ? prisioners.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/press-work" replace color="info">
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
  works: storeState.work.entities,
  prisioners: storeState.prisioner.entities,
  pressWorkEntity: storeState.pressWork.entity,
  loading: storeState.pressWork.loading,
  updating: storeState.pressWork.updating,
  updateSuccess: storeState.pressWork.updateSuccess
});

const mapDispatchToProps = {
  getWorks,
  getPrisioners,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PressWorkUpdate);
