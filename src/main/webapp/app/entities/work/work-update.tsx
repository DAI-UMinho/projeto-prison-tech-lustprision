import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getStates } from 'app/entities/state/state.reducer';
import { getEntity, updateEntity, createEntity, reset } from './work.reducer';

export interface IWorkUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkUpdate = (props: IWorkUpdateProps) => {
  const [stateId, setStateId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { workEntity, states, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/work');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getStates();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...workEntity,
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
          <h2 id="lustPrisionApp.work.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.work.home.createOrEditLabel">Create or edit a Work</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : workEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="work-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="work-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameWorkLabel" for="work-nameWork">
                  <Translate contentKey="lustPrisionApp.work.nameWork">Name Work</Translate>
                </Label>
                <AvField id="work-nameWork" type="text" name="nameWork" />
              </AvGroup>
              <AvGroup>
                <Label id="priceHourLabel" for="work-priceHour">
                  <Translate contentKey="lustPrisionApp.work.priceHour">Price Hour</Translate>
                </Label>
                <AvField id="work-priceHour" type="string" className="form-control" name="totalCredits" />
              </AvGroup>
              <AvGroup>
                <Label id="numVacanciesLabel" for="work-numVacancies">
                  <Translate contentKey="lustPrisionApp.work.numVacancies">Num Vacancies</Translate>
                </Label>
                <AvField id="work-numVacancies" type="string" className="form-control" name="numRemainingEntries" />
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="work-date">
                  <Translate contentKey="lustPrisionApp.work.date">Date</Translate>
                </Label>
                <AvField id="work-date" type="date" className="form-control" name="date" />
              </AvGroup>
              <AvGroup>
                <Label for="work-state">
                  <Translate contentKey="lustPrisionApp.work.state">State</Translate>
                </Label>
                <AvInput id="work-state" type="select" className="form-control" name="state.id">
                  <option value="" key="0" />
                  {states
                    ? states.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/work" replace color="info">
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
  states: storeState.state.entities,
  workEntity: storeState.work.entity,
  loading: storeState.work.loading,
  updating: storeState.work.updating,
  updateSuccess: storeState.work.updateSuccess
});

const mapDispatchToProps = {
  getStates,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkUpdate);
