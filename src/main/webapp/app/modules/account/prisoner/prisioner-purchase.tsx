import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {getPrisonerPurchases} from './prisioner.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles, useTheme, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import MaterialTable, {Column} from "material-table";
import PurchaseDetailDialog from "app/modules/account/prisoner/prisioner-purchase-details";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {TextFormat} from "react-jhipster";
import {useMediaQuery} from "@material-ui/core";
import TableIcon from "app/shared/util/table-icon";

interface TableState {
  columns: Array<Column<any>>;
}

const MySwal = withReactContent(Swal);

export interface IPrisionerPurchaseProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string  }> {
}

export const PrisionerPurchase = (props: IPrisionerPurchaseProps) => {
  const theme = useTheme();
  const colN = useMediaQuery(theme.breakpoints.down('lg')) ? 10 : 8;

  const [selectedID, setSelectedID] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('AMERICA');
  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Numero de Compra', field: 'id', render: rowData => <i>#{rowData.id}</i>},
      {title: 'Data', field: 'date', type: 'datetime', render: rowData => <TextFormat value={rowData.date} type="date" format={APP_DATE_FORMAT} blankOnInvalid />},
      {title: 'Valor Total', field: 'purchaseTotal'},
    ]
  });

  const purchaseDelete = () =>{
    MySwal.fire({
      title: <p>Reverter Compra?</p>,
      text: "Os créditos irão ser devolvidos ao comprador",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd791e',
      confirmButtonText: 'Reverter!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Compra Revertida!',
          'Os créditos gastos na compra foram repostos',
          'success'
        )
      }
    })
  }

  const purchaseClick = id => {
    setSelectedID(id);
    setOpen(true);
  };

  const handleDialogClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const {prisionerPurchases} = props;

  return (
    <Row className="justify-content-center">
      <Col md={colN}>
        <Card className="card-user justify-content-center">
          <MaterialTable
            title="Compras Efetuadas"
            icons={TableIcon}
            columns={state.columns}
            data={prisionerPurchases}
            onRowClick={((evt, selectedRow) => {purchaseClick(selectedRow.id)})}
            options={{
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF',
                fontWeight: 'bold'
              },
              actionsColumnIndex: -1,
              exportButton: true
            }}
            actions={[
              {
                icon: 'replay',
                tooltip: 'Reverter Compra',
                onClick: (event, rowData) => purchaseDelete()
              }
            ]}
            localization={{
              body: {
                emptyDataSourceMessage: "Não existem compras efetuadas por este presidiário",
                editRow: {
                  deleteText: "Tem a certeza que quer eliminar esta compra!?"
                }
              }
            }}
          />
        </Card>
        <PurchaseDetailDialog open={open} selectedValue={selectedValue} onClose={handleDialogClose} purchaseID={selectedID}/>
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
