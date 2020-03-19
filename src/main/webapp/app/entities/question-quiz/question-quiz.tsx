import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './question-quiz.reducer';
import { IQuestionQuiz } from 'app/shared/model/question-quiz.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestionQuizProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const QuestionQuiz = (props: IQuestionQuizProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { questionQuizList, match, loading } = props;
  return (
    <div>
      <h2 id="question-quiz-heading">
        <Translate contentKey="lustPrisionApp.questionQuiz.home.title">Question Quizs</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.questionQuiz.home.createLabel">Create new Question Quiz</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {questionQuizList && questionQuizList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.questionQuiz.questionQuizId">Question Quiz Id</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.questionQuiz.idQuiz">Id Quiz</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.questionQuiz.idQuestion">Id Question</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.questionQuiz.idQuiz">Id Quiz</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.questionQuiz.idQuestion">Id Question</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {questionQuizList.map((questionQuiz, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${questionQuiz.id}`} color="link" size="sm">
                      {questionQuiz.id}
                    </Button>
                  </td>
                  <td>{questionQuiz.questionQuizId}</td>
                  <td>{questionQuiz.idQuiz}</td>
                  <td>{questionQuiz.idQuestion}</td>
                  <td>{questionQuiz.idQuiz ? <Link to={`quiz/${questionQuiz.idQuiz.id}`}>{questionQuiz.idQuiz.id}</Link> : ''}</td>
                  <td>
                    {questionQuiz.idQuestion ? <Link to={`question/${questionQuiz.idQuestion.id}`}>{questionQuiz.idQuestion.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${questionQuiz.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${questionQuiz.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${questionQuiz.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="lustPrisionApp.questionQuiz.home.notFound">No Question Quizs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questionQuiz }: IRootState) => ({
  questionQuizList: questionQuiz.entities,
  loading: questionQuiz.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionQuiz);
