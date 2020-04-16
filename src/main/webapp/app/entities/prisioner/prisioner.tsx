import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './prisioner.reducer';
import { IPrisioner } from 'app/shared/model/prisioner.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrisionerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Prisioner = (props: IPrisionerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { prisionerList, match, loading } = props;
  return (
    <div>
      <h2 id="prisioner-heading">
        <Translate contentKey="lustPrisionApp.prisioner.home.title">Prisioners</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="lustPrisionApp.prisioner.home.createLabel">Create new Prisioner</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {prisionerList && prisionerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.bi">Bi</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.numPrisioner">Num Prisioner</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.numCell">Num Cell</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.dataNascimento">Data Nascimento</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.balance">Balance</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.working">Working</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.profileImage">Profile Image</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.nfcCode">Nfc Code</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.codigoCartao">Codigo Cartao</Translate>
                </th>
                <th>
                  <Translate contentKey="lustPrisionApp.prisioner.permission">Permission</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prisionerList.map((prisioner, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${prisioner.id}`} color="link" size="sm">
                      {prisioner.id}
                    </Button>
                  </td>
                  <td>{prisioner.name}</td>
                  <td>{prisioner.bi}</td>
                  <td>{prisioner.image}</td>
                  <td>{prisioner.numPrisioner}</td>
                  <td>{prisioner.numCell}</td>
                  <td>
                    <TextFormat type="date" value={prisioner.dataNascimento} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{prisioner.balance}</td>
                  <td>{prisioner.working}</td>
                  <td>
                    {prisioner.profileImage ? (
                      <div>
                        <a onClick={openFile(prisioner.profileImageContentType, prisioner.profileImage)}>
                          <img
                            src={`data:${prisioner.profileImageContentType};base64,${prisioner.profileImage}`}
                            style={{ maxHeight: '30px' }}
                          />
                          &nbsp;
                        </a>
                        <span>
                          {prisioner.profileImageContentType}, {byteSize(prisioner.profileImage)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{prisioner.nfcCode}</td>
                  <td>{prisioner.codigoCartao}</td>
                  <td>{prisioner.permission ? <Link to={`permission/${prisioner.permission.id}`}>{prisioner.permission.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prisioner.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prisioner.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${prisioner.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="lustPrisionApp.prisioner.home.notFound">No Prisioners found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ prisioner }: IRootState) => ({
  prisionerList: prisioner.entities,
  loading: prisioner.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Prisioner);
