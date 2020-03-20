import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pris-quiz.reducer';
import { IPrisQuiz } from 'app/shared/model/pris-quiz.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrisQuizProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PrisQuiz = (props: IPrisQuizProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { prisQuizList, match, loading } = props;
  return (
    <div>
      <h2 id="pris-quiz-heading">
        <Translate contentKey="lustPrisionApp.prisQuiz.home.title">Pris Quizs</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.prisQuiz.home.createLabel">Create new Pris Quiz</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {prisQuizList && prisQuizList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisQuiz.quizDate">Quiz Date</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisQuiz.prisioner">Prisioner</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisQuiz.quiz">Quiz</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prisQuizList.map((prisQuiz, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${prisQuiz.id}`} color="link" size="sm">
                      {prisQuiz.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={prisQuiz.quizDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{prisQuiz.prisioner ? <Link to={`prisioner/${prisQuiz.prisioner.id}`}>{prisQuiz.prisioner.id}</Link> : ''}</td>
                  <td>{prisQuiz.quiz ? <Link to={`quiz/${prisQuiz.quiz.id}`}>{prisQuiz.quiz.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prisQuiz.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prisQuiz.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prisQuiz.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.prisQuiz.home.notFound">No Pris Quizs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ prisQuiz }: IRootState) => ({
  prisQuizList: prisQuiz.entities,
  loading: prisQuiz.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisQuiz);
