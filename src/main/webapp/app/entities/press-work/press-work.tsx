import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './press-work.reducer';
import { IPressWork } from 'app/shared/model/press-work.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPressWorkProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PressWork = (props: IPressWorkProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { pressWorkList, match, loading } = props;
  return (
    <div>
      <h2 id="press-work-heading">
        <Translate contentKey="lustPrisionApp.pressWork.home.title">Press Works</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.pressWork.home.createLabel">Create new Press Work</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {pressWorkList && pressWorkList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressWork.workDate">Work Date</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressWork.prisioner">Prisioner</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressWork.work">Work</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.pressWork.state">State</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pressWorkList.map((pressWork, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pressWork.id}`} color="link" size="sm">
                      {pressWork.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={pressWork.workDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{pressWork.prisioner ? <Link to={`prisioner/${pressWork.prisioner.id}`}>{pressWork.prisioner.id}</Link> : ''}</td>
                  <td>{pressWork.work ? <Link to={`work/${pressWork.work.id}`}>{pressWork.work.id}</Link> : ''}</td>
                  <td>{pressWork.state ? <Link to={`state/${pressWork.state.id}`}>{pressWork.state.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pressWork.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pressWork.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pressWork.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.pressWork.home.notFound">No Press Works found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ pressWork }: IRootState) => ({
  pressWorkList: pressWork.entities,
  loading: pressWork.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PressWork);
