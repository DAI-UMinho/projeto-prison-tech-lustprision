import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './quiz.reducer';
import { IQuiz } from 'app/shared/model/quiz.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuizUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuizUpdate = (props: IQuizUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { quizEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/quiz');
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
    if (errors.length === 0) {
      const entity = {
        ...quizEntity,
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
          <h2 id="lustPrisionApp.quiz.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.quiz.home.createOrEditLabel">Create or edit a Quiz</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : quizEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="quiz-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="quiz-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idQuizLabel" for="quiz-idQuiz">
                  <Translate contentKey="lustPrisionApp.quiz.idQuiz">Id Quiz</Translate>
                </Label>
                <AvField id="quiz-idQuiz" type="string" className="form-control" name="idQuiz" />
              </AvGroup>
              <AvGroup>
                <Label id="qtyQuestionLabel" for="quiz-qtyQuestion">
                  <Translate contentKey="lustPrisionApp.quiz.qtyQuestion">Qty Question</Translate>
                </Label>
                <AvField id="quiz-qtyQuestion" type="string" className="form-control" name="qtyQuestion" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/quiz" replace color="info">
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
  quizEntity: storeState.quiz.entity,
  loading: storeState.quiz.loading,
  updating: storeState.quiz.updating,
  updateSuccess: storeState.quiz.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuizUpdate);
