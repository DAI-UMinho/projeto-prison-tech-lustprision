import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {getEntities, deleteEntity, updateCancelWork} from './work.reducer';
import {getChartWorkState, getChartWorkCompleted} from "app/shared/reducers/statistics";
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import MaterialTable, {MTableToolbar, Column} from 'material-table';
import {Line, Pie} from "react-chartjs-2";

import {useTheme} from '@material-ui/core/styles';

import { Ellipsis } from 'react-spinners-css';
import {LinearProgress, useMediaQuery} from "@material-ui/core";
import {TextFormat, Translate} from "react-jhipster";
import {StateBox} from "app/components/StateBox";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import CardNewButton from "app/components/CardNewButton";
import {IWork} from "app/shared/model/work.model";
import TableIcon from "app/shared/util/table-icon";

const MySwal = withReactContent(Swal);

export interface IWorkProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
}

export const Works = (props: IWorkProps) => {
  const theme = useTheme();
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const [data, setData] = useState([]);
  const [chartLineWorkLabel, setChartWorkLabel] = useState(['','']);
  const [chartLineWorkData, setChartWorkData] = useState([0,0]);
  const [chartPieData, setChartStateData] = useState([0,0]);
  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Numero de Trabalho', field: 'id', render: rowData => <i>#{rowData.id}</i>, filtering: false},
      {title: 'Nome do Trabalho', field: 'nameWork', filtering: false},
      {title: 'Data', field: 'date', type: 'date'},
      {title: 'Recompensa', field: 'totalCredits', filtering: false},
      {title: 'Vagas Disponiveis', field: 'numRemainingEntries', filtering: false},
      {title: 'Estado', field: 'state', render: rowData => <StateBox boxText={rowData.state.name} stateID={rowData.state.id}/>,
        lookup: { 1: "Pendente", 2: 'Completado', 3: "Cancelado"},
        customSort: (a, b) => a.state.id - b.state.id,
        customFilterAndSearch: (mID, rowData) => {if(+mID){return +mID === rowData.state.id}else{return 0 < rowData.state.id}},
      }]
  });

  const chartData = {
    labels: chartLineWorkLabel,
    datasets: [
      {
        data: chartLineWorkData,
        fill: false,
        borderColor: "#73b0fb",
        backgroundColor: "transparent",
        pointBorderColor: "#73b0fb",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      }]
  };

  const pieChart = {
    labels: ["Concluídos", "Cancelados"],
    datasets: [
      {
        label: "Emails",
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: ["#4acccd", "#ef8157"],
        borderWidth: 0,
        data: chartPieData
      }
    ]
  };

  const {workList, match, loading, workStateChart, workCompletedChart} = props;

  const updateTable = () => {
    setData([...workList]);
    props.getChartWorkState();
    props.getChartWorkCompleted();
  };

  useEffect(() => {
    props.getEntities();
    props.getChartWorkState();
    props.getChartWorkCompleted();
  }, []);

  useEffect(() => {
    {
      workList && workList.length > 0 ? updateTable() : console.log("NO")
    }
  }, [workList]);

  useEffect(() => {
    {workStateChart && setChartStateData([workStateChart['completed'], workStateChart['canceled']])}
  }, [workStateChart]);

  useEffect(() => {
    {workCompletedChart && setChartWorkData(workCompletedChart.map(x => x.value))}
    {workCompletedChart && setChartWorkLabel(workCompletedChart.map(x => x.monthName))}

  }, [workCompletedChart]);

  const clickCancelWork = id => {
    MySwal.fire({
      title: <p>Cancelar Trabalho?</p>,
      text: "Não é possivel reverter esta operação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Despedir!'
    }).then((result) => {
      if (result.value) {
        return props.updateCancelWork(id);
      }
    }).then((result: any) => {
      console.log(result);
      if(result.value.status === 200){
        console.log("OK");
      }
    })
  };

  const clickDeleteWork = (id) => {
    {
      MySwal.fire({
        title: <p>Apagar Trabalho?</p>,
        text: "Não é possivel reverter esta operação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
      }).then((result) => {
        if (result.value) {
          return props.deleteEntity(id);
        }
      }).then((result: any) => {
        if(result.value.status === 204){
          Swal.fire(
            'Sucesso!',
            'O trabalho foi removido com sucesso.',
            'success'
          )
        }
      })
    }
  };

  const pendingNumber = workList.filter(pending => {return pending.state['id'] === 1}).length;
  const completedNumber = workList.filter(done => {return done.state['id'] === 2}).length;

  return (
    <div>
    <Row>
      <Col lg={mStatCol} md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-time-alarm text-warning"/>
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Trabalhos a Realizar</p>
                  {loading ? (<Ellipsis color="#99c3ff" size={40}/> )
                    : (<CardTitle tag="p">{pendingNumber}</CardTitle>)}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg={mStatCol} md="6" sm="6">
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
                  <p className="card-category">Trabalhos Realizados</p>
                  {loading ? (<Ellipsis color="#99c3ff" size={40}/> )
                    : (<CardTitle tag="p">{completedNumber}</CardTitle>)}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <CardNewButton cardClick={() => props.history.push(match.url + '/new')} cardTitle={"Trabalho"}/>
    </Row>
      <hr/>
    <Row className="justify-content-center">
      <Col md="8">
        <Card className="card-stats">
          <CardHeader>
            <CardTitle tag="h5">Adesão aos Trabalhos</CardTitle>
          </CardHeader>
          <CardBody>
            <Line
              data={chartData}
              legend={false}
              redraw={false}
              height={100}
              options={{responsive: true, scales: {yAxes: [{ticks: {stepSize: 1}}]}}}
            />
          </CardBody>
        </Card>
      </Col>
      <Col md="4">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Trabalhos Concluidos/Cancelados</CardTitle>
          </CardHeader>
          <CardBody>
            <Pie
              redraw={false}
              options={{
                responsive: true,
                legend: {
                  display: true,
                  position: "bottom"
                }}}
              data={pieChart}
            />
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        <Card className="card-user">
          <MaterialTable
            title="Todos os Trabalhos"
            icons={TableIcon}
            columns={state.columns}
            data={data}
            isLoading={loading}
            onRowClick={((evt, selectedRow) => {
              props.history.push(`${match.url}/${selectedRow.id}`)
            })}
            options={{
              headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF',
                fontWeight: 'bold'
              },
              filtering: true,
              actionsColumnIndex: -1
            }}
            localization={{
              body: {
                editRow: {
                  deleteText: "Tem a certeza que quer eliminar este presidiário?!"
                }
              }
            }}
            actions={[
              (rowData: IWork) => ({
                icon: () => <TableIcon.Cancel/>,
                tooltip: 'Cancelar trabalho',
                onClick: (event, row) => clickCancelWork(row.id),
                disabled: rowData.state['id'] > 1
              }),
              {
                icon: () => <TableIcon.Delete/>,
                tooltip: 'Eliminar trabalho',
                onClick: (event, rowData) => clickDeleteWork(rowData.id),
              }
            ]}
          />
        </Card>
      </Col>
    </Row>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  workList: state.work.entities,
  loading: state.work.loading,
  workStateChart: state.statistics.chartWorkState,
  workCompletedChart: state.statistics.chartCompletedWork
});

const mapDispatchToProps = {getEntities, deleteEntity, updateCancelWork, getChartWorkState, getChartWorkCompleted};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Works);
