import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pris-quiz.reducer';
import { IPrisQuiz } from 'app/shared/model/pris-quiz.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrisQuizDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrisQuizDetail = (props: IPrisQuizDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prisQuizEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="lustPrisionApp.prisQuiz.detail.title">PrisQuiz</Translate> [<b>{prisQuizEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quizDate">
              <Translate contentKey="lustPrisionApp.prisQuiz.quizDate">Quiz Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={prisQuizEntity.quizDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="lustPrisionApp.prisQuiz.prisioner">Prisioner</Translate>
          </dt>
          <dd>{prisQuizEntity.prisioner ? prisQuizEntity.prisioner.id : ''}</dd>
          <dt>
            <Translate contentKey="lustPrisionApp.prisQuiz.quiz">Quiz</Translate>
          </dt>
          <dd>{prisQuizEntity.quiz ? prisQuizEntity.quiz.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/pris-quiz" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pris-quiz/${prisQuizEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prisQuiz }: IRootState) => ({
  prisQuizEntity: prisQuiz.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisQuizDetail);
