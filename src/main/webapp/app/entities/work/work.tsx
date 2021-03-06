import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './work.reducer';
import { IWork } from 'app/shared/model/work.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWorkProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Work = (props: IWorkProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { workList, match, loading } = props;
  return (
    <div>
      <h2 id="work-heading">
        <Translate contentKey="lustPrisionApp.work.home.title">Works</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.work.home.createLabel">Create new Work</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {workList && workList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.work.nameWork">Name Work</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.work.priceHour">Price Hour</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.work.numVacancies">Num Vacancies</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.work.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.work.state">State</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workList.map((work, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${work.id}`} color="link" size="sm">
                      {work.id}
                    </Button>
                  </td>
                  <td>{work.nameWork}</td>
                  <td>{work.totalCredits}</td>
                  <td>{work.numRemainingEntries}</td>
                  <td>
                    <TextFormat type="date" value={work.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{work.stateID ? <Link to={`state/${work.stateID}`}>{work.stateID}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${work.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${work.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${work.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.work.home.notFound">No Works found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ work }: IRootState) => ({
  workList: work.entities,
  loading: work.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Work);
