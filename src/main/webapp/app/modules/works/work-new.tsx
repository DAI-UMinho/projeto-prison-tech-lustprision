import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Card, CardHeader, CardBody, CardTitle, CardFooter, Label} from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { createEntity, reset} from './work.reducer';
import { IWork } from 'app/shared/model/work.model';
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {subYears} from "date-fns";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {datePicker} from "app/shared/layout/themes/themes";

export interface IWorkUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WorkCreate = (props: IWorkUpdateProps) => {
  const classes = datePicker();
  const { workEntity, updating } = props;

  const [selectedDate, handleDateChange] = useState(new Date());

  const handleClose = () => {
    props.history.push('/dashboard/works');
  };

  useEffect(() => {
    props.reset();
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

      props.createEntity(entity);
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <Card className="card-user justify-content-center">
            <CardHeader>
              <CardTitle tag="h5">
                Criar Novo Trabalho
              </CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm onSubmit={saveEntity}>
                <AvGroup>
                  <Label id="nameWorkLabel" for="work-nameWork">
                    <Translate contentKey="lustPrisionApp.work.nameWork">Name Work</Translate>
                  </Label>
                  <AvField id="work-nameWork" type="text" name="nameWork"
                           validate={{
                             required: {
                               value: true,
                               errorMessage: translate('lustPrisionApp.work.validation.name.required')
                             },
                             minLength: {
                               value: 5,
                               errorMessage: translate('lustPrisionApp.work.validation.name.minLength')
                             },
                             maxLength: {
                               value: 40,
                             }
                           }}/>
                </AvGroup>
                <AvGroup>
                  <Label id="priceHourLabel" for="work-priceHour">
                    <Translate contentKey="lustPrisionApp.work.priceHour">Price Hour</Translate>
                  </Label>
                  <AvField id="work-totalCredits" type="text" className="form-control" name="totalCredits"
                           validate={{
                             required: {
                               value: true,
                               errorMessage: translate('lustPrisionApp.work.validation.credits.required')
                             },
                             minLength: {
                               value: 1,
                               errorMessage: translate('lustPrisionApp.work.validation.credits.length')
                             },
                             maxLength: {
                               value: 3,
                               errorMessage: translate('lustPrisionApp.work.validation.credits.length')
                             },
                             min: {value: 1},
                             max: {value: 999}
                           }}/>
                </AvGroup>
                <AvGroup>
                  <Label id="numVacanciesLabel" for="work-numVacancies">
                    <Translate contentKey="lustPrisionApp.work.numVacancies">Num Entries</Translate>
                  </Label>
                  <AvField id="work-numRemainingEntries" type="text" className="form-control" name="numRemainingEntries"
                           validate={{
                             number: true,
                             required: {
                               value: true,
                               errorMessage: translate('lustPrisionApp.work.validation.entries.required')
                             },
                             minLength: {
                               value: 1,
                               errorMessage: translate('lustPrisionApp.work.validation.entries.minLength')
                             },
                             maxLength: {
                               value: 3,
                               errorMessage: translate('lustPrisionApp.work.validation.entries.maxLength')
                             },
                             min: {value: 0},
                             max: {value: 999}
                           }}/>
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="work-date">
                    <Translate contentKey="lustPrisionApp.work.date">Date</Translate>
                  </Label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disablePast
                      className={`form-control ${classes.datePicker}`}
                      openTo="date"
                      format="dd/MM/yyyy"
                      views={["year", "month", "date"]}
                      value={selectedDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                    />
                    <AvField id="date" type="hidden" name="date" value={selectedDate} validate={{
                      required:{
                        value: true,
                        errorMessage: translate('lustPrisionApp.prisioner.validation.data.required')
                      }
                    }}/>
                  </MuiPickersUtilsProvider>
                </AvGroup>
                <AvInput type="hidden" name="state.id" value={1}/>
                <Button tag={Link} id="cancel-save" onClick={handleClose} replace color="info">
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  workEntity: storeState.work.entity,
  updating: storeState.work.updating,
  updateSuccess: storeState.work.updateSuccess
});

const mapDispatchToProps = {createEntity , reset};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkCreate);
