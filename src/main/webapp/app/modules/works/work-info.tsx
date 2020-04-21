import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {AvFeedback, AvForm, AvGroup, AvInput, AvField} from 'availity-reactstrap-validation';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Row, Col, Card, CardHeader, CardBody, CardTitle, CardFooter, Label} from 'reactstrap';
import {IRootState} from 'app/shared/reducers';

import {IState} from 'app/shared/model/state.model';
import {getEntity, updateEntity, createEntity, reset} from './work.reducer';
import {IWork} from 'app/shared/model/work.model';

export interface IWorkUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const WorkInfo = (props: IWorkUpdateProps) => {

  const {workEntity, loading, updating} = props;

  const handleClose = () => {
    props.history.push('/dashboard/works');
  };

  useEffect(() => {
    props.getEntity(props.match.params.id);
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

      props.updateEntity(entity);
    }
  };

  return (
    <Row>
      <Col md="8">
        <Card className="card-user justify-content-center">
          <CardHeader>
            <CardTitle tag="h5">Editar Trabalho</CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={workEntity} onSubmit={saveEntity}>
                <AvGroup>
                  <Label for="work-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="work-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
                <AvGroup>
                  <Label id="nameWorkLabel" for="work-nameWork">
                    <Translate contentKey="lustPrisionApp.work.nameWork">Name Work</Translate>
                  </Label>
                  <AvField id="work-nameWork" type="text" name="nameWork"/>
                </AvGroup>
                <AvGroup>
                  <Label id="priceHourLabel" for="work-priceHour">
                    <Translate contentKey="lustPrisionApp.work.priceHour">Price Hour</Translate>
                  </Label>
                  <AvField id="work-priceHour" type="string" className="form-control" name="totalCredits"/>
                </AvGroup>
                <AvGroup>
                  <Label id="numVacanciesLabel" for="work-numVacancies">
                    <Translate contentKey="lustPrisionApp.work.numVacancies">Num Vacancies</Translate>
                  </Label>
                  <AvField id="work-numVacancies" type="string" className="form-control" name="numRemainingEntries"/>
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="work-date">
                    <Translate contentKey="lustPrisionApp.work.date">Date</Translate>
                  </Label>
                  <AvField id="work-date" type="date" className="form-control" name="date"/>
                </AvGroup>
                <Button tag={Link} id="cancel-save" onClick={handleClose} replace color="info">
                  <FontAwesomeIcon icon="arrow-left"/>
                  &nbsp;
                  <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save"/>
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  workEntity: storeState.work.entity,
  loading: storeState.work.loading,
  updating: storeState.work.updating,
  updateSuccess: storeState.work.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkInfo);
