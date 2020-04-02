import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {getPrisonerPurchases} from './prisioner.reducer';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.white,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export interface IPrisionerPurchaseProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string  }> {
}

export const PrisionerPurchase = (props: IPrisionerPurchaseProps) => {
  const classes = useStyles();
  const {prisionerPurchases} = props;

  return (
    <Row className="justify-content-center">
      <Col md="8">
        <Card className="card-user justify-content-center">
          <CardHeader>
            <CardTitle tag="h5">Todas as compras</CardTitle>
          </CardHeader>
          <CardBody>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Numero da Compra</StyledTableCell>
                    <StyledTableCell>Items</StyledTableCell>
                    <StyledTableCell>Valor</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prisionerPurchases.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">#{row.id}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({prisioner}: IRootState) => ({
  prisionerPurchases: prisioner.purchases,
});

const mapDispatchToProps = {getPrisonerPurchases};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerPurchase);
