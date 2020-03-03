import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './produto.reducer';
import { IProduto } from 'app/shared/model/produto.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProdutoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProdutoDetail = (props: IProdutoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { produtoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Produto [<b>{produtoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nome">Nome</span>
          </dt>
          <dd>{produtoEntity.nome}</dd>
          <dt>
            <span id="category">Category</span>
          </dt>
          <dd>{produtoEntity.category}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{produtoEntity.price}</dd>
        </dl>
        <Button tag={Link} to="/produto" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/produto/${produtoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ produto }: IRootState) => ({
  produtoEntity: produto.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoDetail);
