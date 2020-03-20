import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuiz } from 'app/shared/model/quiz.model';
import { getEntities as getQuizzes } from 'app/entities/quiz/quiz.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { getEntities as getQuestions } from 'app/entities/question/question.reducer';
import { getEntity, updateEntity, createEntity, reset } from './question-quiz.reducer';
import { IQuestionQuiz } from 'app/shared/model/question-quiz.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestionQuizUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestionQuizUpdate = (props: IQuestionQuizUpdateProps) => {
  const [quizId, setQuizId] = useState('0');
  const [questionId, setQuestionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { questionQuizEntity, quizzes, questions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/question-quiz');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getQuizzes();
    props.getQuestions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...questionQuizEntity,
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
          <h2 id="lustPrisionApp.questionQuiz.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.questionQuiz.home.createOrEditLabel">Create or edit a QuestionQuiz</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : questionQuizEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="question-quiz-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="question-quiz-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="questionQuizIdLabel" for="question-quiz-questionQuizId">
                  <Translate contentKey="lustPrisionApp.questionQuiz.questionQuizId">Question Quiz Id</Translate>
                </Label>
                <AvField id="question-quiz-questionQuizId" type="string" className="form-control" name="questionQuizId" />
              </AvGroup>
              <AvGroup>
                <Label for="question-quiz-quiz">
                  <Translate contentKey="lustPrisionApp.questionQuiz.quiz">Quiz</Translate>
                </Label>
                <AvInput id="question-quiz-quiz" type="select" className="form-control" name="quiz.id">
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
              <AvGroup>
                <Label for="question-quiz-question">
                  <Translate contentKey="lustPrisionApp.questionQuiz.question">Question</Translate>
                </Label>
                <AvInput id="question-quiz-question" type="select" className="form-control" name="question.id">
                  <option value="" key="0" />
                  {questions
                    ? questions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/question-quiz" replace color="info">
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
  quizzes: storeState.quiz.entities,
  questions: storeState.question.entities,
  questionQuizEntity: storeState.questionQuiz.entity,
  loading: storeState.questionQuiz.loading,
  updating: storeState.questionQuiz.updating,
  updateSuccess: storeState.questionQuiz.updateSuccess
});

const mapDispatchToProps = {
  getQuizzes,
  getQuestions,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionQuizUpdate);
