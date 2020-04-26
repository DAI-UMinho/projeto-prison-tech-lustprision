import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {getEntities, deleteEntity, updateCancelWork} from './work.reducer';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import MaterialTable, {MTableToolbar, Column} from 'material-table';
import {Line, Pie} from "react-chartjs-2";

import {withStyles, Theme, createStyles, makeStyles, useTheme} from '@material-ui/core/styles';

import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Ellipsis } from 'react-spinners-css';
import {LinearProgress, useMediaQuery} from "@material-ui/core";
import {TextFormat, Translate} from "react-jhipster";
import StateBox from "app/components/StateBox";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import CardNewButton from "app/components/CardNewButton";

const MySwal = withReactContent(Swal);

const chartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  datasets: [
    {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: "#73b0fb",
      backgroundColor: "transparent",
      pointBorderColor: "#73b0fb",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    }]
};

const pieData = {
  labels: ["Concluídos", "Cancelados"],
  datasets: [
    {
      label: "Emails",
      pointRadius: 0,
      pointHoverRadius: 0,
      backgroundColor: ["#4acccd", "#ef8157"],
      borderWidth: 0,
      data: [382, 44]
    }
  ]
};

export interface IWorkProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
}

export const Works = (props: IWorkProps) => {
  const theme = useTheme();
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const [data, setData] = useState([]);
  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Numero de Trabalho', field: 'id', render: rowData => <i>#{rowData.id}</i>},
      {title: 'Nome do Trabalho', field: 'nameWork'},
      {title: 'Data', field: 'date', type: 'datetime', render: rowData => <TextFormat value={rowData.date} type="date" format={APP_DATE_FORMAT} blankOnInvalid />},
      {title: 'Recompensa', field: 'totalCredits'},
      {title: 'Vagas Disponiveis', field: 'numRemainingEntries'},
      {title: 'Estado', field: 'state', render: rowData => <StateBox boxText={rowData.state.name} stateID={rowData.state.id}/>},
    ]
  });

  const {workList, match, loading} = props;

  const updateTable = () => {
    setData([...workList]);
  };

  useEffect(() => {
    props.getEntities();
  }, []);

  useEffect(() => {
    {
      workList && workList.length > 0 ? updateTable() : console.log("NO")
    }
  }, [workList]);

  const clickCancelWork = (id) => {
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

  const pendingNumber = workList.filter(pending => {return pending.state.id === 1}).length;
  const completedNumber = workList.filter(done => {return done.state.id === 2}).length;

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
            <p className="card-category">Numero de trabalhos realizados ao longo de 1 ano</p>
          </CardHeader>
          <CardBody>
            <Line
              data={chartData}
              legend={false}
              redraw={false}
              options={{responsive: true}}
              width={400}
              height={100}
            />
          </CardBody>
        </Card>
      </Col>
      <Col md="4">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Trabalhos Concluidos/Cancelados</CardTitle>
            <p className="card-category">Diferença entre as conclusoes dos trabalhos</p>
          </CardHeader>
          <CardBody>
            <Pie
              legend={false}
              redraw={false}
              options={{responsive: true}}
              data={pieData}
            />
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        <Card className="card-user">
          <MaterialTable
            title="Todos os Trabalhos"
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
              rowData => ({
                icon: 'cancel',
                tooltip: 'Cancelar trabalho',
                onClick: (event, row) => clickCancelWork(row.id),
                disabled: rowData.state.id > 1
              }),
              {
                icon: 'delete',
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

const mapStateToProps = ({work}: IRootState) => ({
  workList : work.entities,
  loading: work.loading,
});

const mapDispatchToProps = {getEntities, deleteEntity, updateCancelWork};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Works);
