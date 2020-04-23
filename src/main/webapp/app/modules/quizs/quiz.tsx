import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import MaterialTable, {MTableToolbar, Column} from 'material-table';

import {withStyles, Theme, createStyles, makeStyles, useTheme} from '@material-ui/core/styles';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Ellipsis} from 'react-spinners-css';
import {LinearProgress, useMediaQuery} from "@material-ui/core";
import {Translate} from "react-jhipster";
import {getWaitingList, updateQuizAuthorization} from "app/modules/quizs/pris-quiz.reducer";
import StateBox from "app/components/StateBox";
import Swal from "sweetalert2";

export interface IQuizProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
}

export const Quiz = (props: IQuizProps) => {
  const theme = useTheme();
  const mCol = useMediaQuery(theme.breakpoints.up('xl')) ? 7 : 10;
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const [approvalList, setApprovalList] = useState([]);

  const [state, setState] = React.useState<TableState>({
    columns: [
      {
        title: 'Name', field: 'name',
        render: rowData =>
          <div>
            <img src={`data:${rowData.prisonerImageContentType};base64,${rowData.prisonerImage}`}
                 style={{width: 50, borderRadius: '50%', float: 'left', marginRight: 10}}/>
            <p style={{paddingTop: 15}}>{rowData.prisonerName}</p>
          </div>
      },
      {title: 'Data', field: 'quizDate', type: 'date'},
      {
        title: 'Approval',
        field: 'approval',
        render: rowData => <StateBox boxText={"PENDENTE"} stateID={rowData.approval}/>
      },
    ]
  });

  const {waitingList, match, loading} = props;

  useEffect(() => {
    props.getWaitingList();
  }, []);

  const updateTable = () => {
    setApprovalList([...waitingList]);
  };

  useEffect(() => {
    {
      waitingList && waitingList.length > 0 ? updateTable() : console.log("NO")
    }
  }, [waitingList]);

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
    row: {
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px'
    },
    spacer: {
      flexGrow: 1
    },
    importButton: {
      marginRight: '10px'
    },
    exportButton: {
      marginRight: '10px'
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={mStatCol} md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-bulb-63 text-warning"/>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Quizes Realizados</p>
                    {loading ? (<Ellipsis color="#99c3ff" size={40}/> )
                      : (<CardTitle tag="p">0</CardTitle>)}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col onClick={() => props.history.push(`${match.url}/questions`)} lg={mStatCol} md="6" sm="6">
          <Card className="card-stats">
            <CardBody style={{backgroundColor: "#2b5eb1", borderRadius: '12px'}}>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-single-copy-04 text-success"/>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <CardTitle style={{color: "#ffffff"}} tag="p">Questões</CardTitle>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={mCol}>
          <Card className="card-user">
            <MaterialTable
              title="Aprovação Pendente"
              columns={state.columns}
              data={approvalList}
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
                {
                  icon: 'done',
                  tooltip: 'Aprovar Quiz',
                  onClick: (event, rowData) => props.updateQuizAuthorization(rowData.id)
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
  waitingList: state.prisQuiz.waiting,
  loading: state.prisQuiz.loading,
  updateSuccess: state.prisQuiz.updateSuccess
});

const mapDispatchToProps = {getWaitingList, updateQuizAuthorization};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
