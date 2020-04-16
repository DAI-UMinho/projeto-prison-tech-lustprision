import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './question-quiz.reducer';
import { IQuestionQuiz } from 'app/shared/model/question-quiz.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestionQuizDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestionQuizDetail = (props: IQuestionQuizDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { questionQuizEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.questionQuiz.detail.title">QuestionQuiz</Translate> [<b>{questionQuizEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="questionAnswer">
              <Translate contentKey="lustPrisionApp.questionQuiz.questionAnswer">Question Answer</Translate>
            </span>
          </dt>
          <dd>{questionQuizEntity.questionAnswer}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.questionQuiz.quiz">Quiz</Translate>
          </dt>
          <dd>{questionQuizEntity.quiz ? questionQuizEntity.quiz.id : ''}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.questionQuiz.question">Question</Translate>
          </dt>
          <dd>{questionQuizEntity.question ? questionQuizEntity.question.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/question-quiz" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/question-quiz/${questionQuizEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ questionQuiz }: IRootState) => ({
  questionQuizEntity: questionQuiz.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionQuizDetail);
