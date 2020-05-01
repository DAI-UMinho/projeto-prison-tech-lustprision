import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './question.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Question = (props: IQuestionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { questionList, match, loading } = props;
  return (
    <div>
      <h2 id="question-heading">
        <Translate contentKey="lustPrisionApp.question.home.title">Questions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.question.home.createLabel">Create new Question</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {questionList && questionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.question.question">Question</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.question.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.question.answer">Answer</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.question.wrongAnswer1">Wrong Answer 1</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.question.wrongAnswer2">Wrong Answer 2</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.question.wrongAnswer3">Wrong Answer 3</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {questionList.map((question, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${question.id}`} color="link" size="sm">
                      {question.id}
                    </Button>
                  </td>
                  <td>{question.question}</td>
                  <td>{question.value}</td>
                  <td>{question.answer}</td>
                  <td>{question.wrongAnswer1}</td>
                  <td>{question.wrongAnswer2}</td>
                  <td>{question.wrongAnswer3}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${question.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${question.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${question.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.question.home.notFound">No Questions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ question }: IRootState) => ({
  questionList: question.entities,
  loading: question.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
