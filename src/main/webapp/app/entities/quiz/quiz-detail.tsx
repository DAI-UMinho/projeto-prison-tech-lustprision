import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quiz.reducer';
import { IQuiz } from 'app/shared/model/quiz.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuizDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuizDetail = (props: IQuizDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { quizEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.quiz.detail.title">Quiz</Translate> [<b>{quizEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idQuiz">
              <Translate contentKey="lustPrisionApp.quiz.idQuiz">Id Quiz</Translate>
            </span>
          </dt>
          <dd>{quizEntity.idQuiz}</dd>
          <dt>
            <span id="questQuizId">
              <Translate contentKey="lustPrisionApp.quiz.questQuizId">Quest Quiz Id</Translate>
            </span>
          </dt>
          <dd>{quizEntity.questQuizId}</dd>
          <dt>
            <span id="qtyQuestion">
              <Translate contentKey="lustPrisionApp.quiz.qtyQuestion">Qty Question</Translate>
            </span>
          </dt>
          <dd>{quizEntity.qtyQuestion}</dd>
        </dl>
        <Button tag={Link} to="/quiz" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/quiz/${quizEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ quiz }: IRootState) => ({
  quizEntity: quiz.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuizDetail);
