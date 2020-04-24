import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPrisioner } from 'app/shared/model/prisioner.model';
import { getEntities as getPrisioners } from 'app/entities/prisioner/prisioner.reducer';
import { IQuiz } from 'app/shared/model/quiz.model';
import { getEntities as getQuizzes } from 'app/entities/quiz/quiz.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pris-quiz.reducer';
import { IPrisQuiz } from 'app/shared/model/pris-quiz.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPrisQuizUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrisQuizUpdate = (props: IPrisQuizUpdateProps) => {
  const [prisionerId, setPrisionerId] = useState('0');
  const [quizId, setQuizId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { prisQuizEntity, prisioners, quizzes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pris-quiz');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPrisioners();
    props.getQuizzes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...prisQuizEntity,
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
          <h2 id="lustPrisionApp.prisQuiz.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.prisQuiz.home.createOrEditLabel">Create or edit a PrisQuiz</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prisQuizEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pris-quiz-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pris-quiz-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quizDateLabel" for="pris-quiz-quizDate">
                  <Translate contentKey="lustPrisionApp.prisQuiz.quizDate">Quiz Date</Translate>
                </Label>
                <AvField id="pris-quiz-quizDate" type="date" className="form-control" name="quizDate" />
              </AvGroup>
              <AvGroup>
                <Label id="approvalLabel" for="pris-quiz-approval">
                  <Translate contentKey="lustPrisionApp.prisQuiz.approval">Approval</Translate>
                </Label>
                <AvField
                  id="pris-quiz-approval"
                  type="string"
                  className="form-control"
                  name="approval"
                  validate={{
                    max: { value: 1, errorMessage: translate('entity.validation.max', { max: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="pris-quiz-prisioner">
                  <Translate contentKey="lustPrisionApp.prisQuiz.prisioner">Prisioner</Translate>
                </Label>
                <AvInput id="pris-quiz-prisioner" type="select" className="form-control" name="prisioner.id">
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
              <AvGroup>
                <Label for="pris-quiz-quiz">
                  <Translate contentKey="lustPrisionApp.prisQuiz.quiz">Quiz</Translate>
                </Label>
                <AvInput id="pris-quiz-quiz" type="select" className="form-control" name="quiz.id">
                  <option value="" key="0" />
                  {quizzes
                    ? quizzes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pris-quiz" replace color="info">
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
  prisioners: storeState.prisioner.entities,
  quizzes: storeState.quiz.entities,
  prisQuizEntity: storeState.prisQuiz.entity,
  loading: storeState.prisQuiz.loading,
  updating: storeState.prisQuiz.updating,
  updateSuccess: storeState.prisQuiz.updateSuccess
});

const mapDispatchToProps = {
  getPrisioners,
  getQuizzes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisQuizUpdate);
