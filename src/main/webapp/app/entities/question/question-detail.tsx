import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './question.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestionDetail = (props: IQuestionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { questionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.question.detail.title">Question</Translate> [<b>{questionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="question">
              <Translate contentKey="lustPrisionApp.question.question">Question</Translate>
            </span>
          </dt>
          <dd>{questionEntity.question}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="lustPrisionApp.question.value">Value</Translate>
            </span>
          </dt>
          <dd>{questionEntity.value}</dd>
          <dt>
            <span id="answer">
              <Translate contentKey="lustPrisionApp.question.answer">Answer</Translate>
            </span>
          </dt>
          <dd>{questionEntity.answer}</dd>
          <dt>
            <span id="wrongAnswer1">
              <Translate contentKey="lustPrisionApp.question.wrongAnswer1">Wrong Answer 1</Translate>
            </span>
          </dt>
          <dd>{questionEntity.wrongAnswer1}</dd>
          <dt>
            <span id="wrongAnswer2">
              <Translate contentKey="lustPrisionApp.question.wrongAnswer2">Wrong Answer 2</Translate>
            </span>
          </dt>
          <dd>{questionEntity.wrongAnswer2}</dd>
          <dt>
            <span id="wrongAnswer3">
              <Translate contentKey="lustPrisionApp.question.wrongAnswer3">Wrong Answer 3</Translate>
            </span>
          </dt>
          <dd>{questionEntity.wrongAnswer3}</dd>
        </dl>
        <Button tag={Link} to="/question" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/question/${questionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ question }: IRootState) => ({
  questionEntity: question.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
