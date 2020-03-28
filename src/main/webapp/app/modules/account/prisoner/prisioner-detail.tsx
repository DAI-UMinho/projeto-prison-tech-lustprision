import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle} from 'reactstrap';
import {Translate, ICrudGetAllAction, TextFormat, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './prisioner.reducer';
import {IPrisioner} from 'app/shared/model/prisioner.model';

import {withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {promise} from "selenium-webdriver";
import {Moment} from "moment";

export interface IPrisionerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string  }> {
}

export const PrisionerDetail = (props: IPrisionerDetailProps) => {

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prisionerEntity } = props;

  /*  const useStyles = makeStyles({
      table: {
        minWidth: 700,
      },
    });*/

  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    },
    table: {
      minWidth: 700,
    },
  }));

  const classes = useStyles();

  return (
    <Row>
      <Col md="12">
        <Card className="card-user">
          <CardHeader>
            <CardTitle tag="h5">{prisionerEntity.name}</CardTitle>
          </CardHeader>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prisioner }: IRootState) => ({
  prisionerEntity: prisioner.entity
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerDetail);
