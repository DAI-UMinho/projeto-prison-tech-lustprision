import React, {useState, useEffect, forwardRef} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Col, Row, Card, CardBody, CardTitle} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {getPrisionerWorks} from './prisioner.reducer';
import {getPrisonerWorkStates} from "app/shared/reducers/statistics";
// import {deleteWork} from "app/entities/work/work.reducer";
import { cancelPressProduct} from "app/modules/account/prisoner/press-work.reducer";
import MaterialTable, {Column} from "material-table";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {StateBox} from "app/components/StateBox";
import {useTheme} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import {IWork} from "app/shared/model/work.model";
import TableIcon from "app/shared/util/table-icon";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import DeleteIcon from '@material-ui/icons/Delete';

const MySwal = withReactContent(Swal);

interface TableState {
  columns: Array<Column<any>>;
}

export interface IPrisionerWorkProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string  }> {
}

export const PrisionerWork = (props: IPrisionerWorkProps) => {
  const theme = useTheme();
  const colN = useMediaQuery(theme.breakpoints.down('lg')) ? 10 : 8;

  const [data, setData] = useState([]);
  const {prisionerWorks, updateSuccess, workStats} = props;

  const creditsEarned: number = prisionerWorks.filter(completed => {return completed.stateID === 2})
                                      .reduce((accumulator, completed) => accumulator + completed.totalCredits, 0);


  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Identificação', field: 'id', render: rowData => <i>#{rowData.id}</i>},
      {title: 'Nome', field: 'nameWork'},
      {title: 'Data', field: 'dateWork', type: 'date'},
      {title: 'Créditos', field: 'totalCredits'},
      {title: 'Estado', field: 'state', render: rowData => <StateBox boxText={rowData.stateName} stateID={rowData.stateID}/>},
    ]
  });

  const clickCancelWork = (id) => {
    MySwal.fire({
      title: <p>Despedir Presidiario?</p>,
      text: "Não é possivel reverter esta operação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Despedir!'
    }).then((result) => {
      if (result.value) {
        return props.cancelPressProduct(id);
      }
    }).then((result: any) => {
      console.log(result);
      if(result.value.status === 200){
        props.getPrisionerWorks(props.match.params.id);
        // Swal.fire(
        //   'Sucesso!',
        //   'O presidiário foi removido deste trabalho',
        //   'success'
        // )
      }
    })
  };

  return (
    <Row className="justify-content-center">
      <Col md={colN}>
        <Card className="card-user justify-content-center">
            <MaterialTable
              icons={TableIcon}
              title="Trabalhos Realizados"
              columns={state.columns}
              data={prisionerWorks}
              onRowClick={((evt, selectedRow) =>
                window.location.replace(`dashboard/works/${selectedRow.id}`))}
              options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF',
                  fontWeight: 'bold'
                },
                actionsColumnIndex: -1,
                exportButton: true
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: "Ainda não existem trabalhos para este presidiário",
                  editRow: {
                    deleteText: "Tem a certeza que quer eliminar este presidiário?!"
                  }
                }
              }}
              actions={[
                (rowData: IWork) => ({
                  icon: 'cancel',
                  tooltip: 'Despedir deste trabalho',
                  onClick: (event, mData) => clickCancelWork(mData.pressProductId),
                  disabled: rowData.stateID > 1
                }),
                {
                  icon: 'delete',
                  tooltip: 'Remover trabalho',
                  onClick: (event, rowData) =>
                    MySwal.fire({
                      title: <p>Apagar Trabalho?</p>,
                      text: "Não é possivel reverter esta operação!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Apagar!'
                    }).then((result) => {
                      if (result.value) {
                        // return props.deleteWork(rowData.id);
                      }
                    }).then((result: any) => {
                      if(result.value.status === 204){
                        props.getPrisionerWorks(props.match.params.id);
                        Swal.fire(
                          'Sucesso!',
                          'O trabalho deste presioneiro foi removido.',
                          'success'
                        )
                      }
                    })
                }
              ]}
            />
        </Card>
      </Col>
      <Col lg="3" md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-money-coins text-success"/>
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Créditos Ganhos</p>
                  <CardTitle tag="p">{creditsEarned}</CardTitle>
                  <p/>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-delivery-fast text-info"/>
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Trabalhos Concluidos</p>
                  <CardTitle tag="p">{workStats.completed}</CardTitle>
                  <p/>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-simple-remove text-danger"/>
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Trabalhos Cancelados</p>
                  <CardTitle tag="p">{workStats.canceled}</CardTitle>
                  <p/>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: IRootState) => ({
  prisionerWorks: state.prisioner.works,
  updateSuccess: state.work.updateSuccess,
  workStats: state.statistics.prisonerWorkStats
});

const mapDispatchToProps = {getPrisionerWorks, cancelPressProduct, getPrisonerWorkStates};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerWork);
