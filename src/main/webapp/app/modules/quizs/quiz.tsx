import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import MaterialTable, {MTableToolbar, Column} from 'material-table';

import {makeStyles, useTheme} from '@material-ui/core/styles';

import {Ellipsis} from 'react-spinners-css';
import {useMediaQuery} from "@material-ui/core";
import {TextFormat, Translate} from "react-jhipster";
import {getWaitingList, updateQuizAuthorization, deleteEntity} from "app/modules/quizs/pris-quiz.reducer";
import {getCompletedQuizzes, getQuizResults, deleteQuiz} from "./quiz.reducer"
import {StateBox, QuizBox} from "app/components/StateBox";
import Swal from "sweetalert2";
import QuizDetailDialog from "app/modules/quizs/quiz-details";
import TableIcon from "app/shared/util/table-icon";
import {quizTheme} from "app/shared/layout/themes/themes";

export interface IQuizProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

interface TableState {
  pending: Array<Column<any>>;
  quizzes: Array<Column<any>>;
}

export const Quiz = (props: IQuizProps) => {
  const theme = useTheme();
  const classes = quizTheme();
  const mCol = useMediaQuery(theme.breakpoints.up('xl')) ? 8 : 10;
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const [selectedID, setSelectedID] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [approvalList, setApprovalList] = useState([]);
  const [quizList, setQuizList] = useState([]);

  const [state, setState] = React.useState<TableState>({
    pending: [
      {
        title: 'Name', field: 'name',
        render: rowData =>
          <div>
            <img src={`data:${rowData.prisonerImageContentType};base64,${rowData.prisonerImage}`}
                 className="prisoner-image"/>
            <p style={{paddingTop: 15}}>{rowData.prisonerName}</p>
          </div>
      },
      {title: 'Data', field: 'quizDate', type: 'date', render: rowData => <TextFormat value={rowData.quizDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />},
      {
        title: 'Approval',
        field: 'approval',
        render: rowData => <StateBox boxText={"PENDENTE"} stateID={rowData.approval}/>
      },
    ],
    quizzes: [
      {title: 'Identificação', field: 'id', render: rowData => <i>#{rowData.quizID}</i>},
      {
        title: 'Presidiário', field: 'name',
        render: rowData =>
          <div>
            <img src={`data:${rowData.prisonerImageContentType};base64,${rowData.prisonerImage}`}
                 style={{width: 50, borderRadius: '50%', float: 'left', marginRight: 10}}/>
            <p style={{paddingTop: 15}}>{rowData.prisonerName}</p>
          </div>
      },
      {title: 'Data', field: 'quizDate', type: 'date'},
      {
        title: 'Score', field: 'score',
        render: rowData => <QuizBox correctAnswers={rowData.correctAnswers} nQuestions={rowData.qtyQuestion}/>
      },
    ]
  });

  const {waitingList, completedQuizzes, match, loading, resultLoading} = props;

  useEffect(() => {
    props.getWaitingList();
    props.getCompletedQuizzes();
  }, []);

  const updateTable = () => {
    console.log("ATUALIZAR");
    setApprovalList([...waitingList]);
  };

  const handleDialogClose = (value: string) => {
    setOpen(false);
  };

  useEffect(() => {
    {
      waitingList && waitingList.length > 0 ? updateTable() : console.log("NO")
    }
  }, [waitingList]);

  useEffect(() => {
    {completedQuizzes && completedQuizzes.length > 0 && setQuizList([...completedQuizzes])}
  }, [completedQuizzes]);

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
                      : (<CardTitle tag="p">{completedQuizzes.length}</CardTitle>)}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col onClick={() => props.history.push(`${match.url}/questions`)} lg={mStatCol} md="6" sm="6">
          <Card className="card-stats">
            <CardBody className={classes.cardBody}>
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
              title="Quizzes Completados"
              icons={TableIcon}
              columns={state.quizzes}
              data={completedQuizzes}
              isLoading={resultLoading}
              onRowClick={((evt, selectedRow) => {
                  setSelectedID(selectedRow.quizID);
                  setOpen(true);
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
                  emptyDataSourceMessage: "Não existem quizzes completados",
                }
              }}
              actions={[
                {
                  icon: () => <TableIcon.Delete/>,
                  tooltip: 'Eliminar Quiz',
                  onClick: (event, rowData) => props.deleteQuiz(rowData.quizID)
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={mCol}>
          <Card className="card-user">
            <MaterialTable
              title="Aprovações Pendentes"
              icons={TableIcon}
              columns={state.pending}
              data={approvalList}
              isLoading={loading}
              onRowClick={((evt, selectedRow) => {
                props.history.push(`${match.url}/${selectedRow.id}`)
              })}
              options={{
                headerStyle: {
                  color: '#000',
                  fontWeight: 'bold'
                },
                actionsColumnIndex: -1
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: "Não existem aprovações de quizzes neste momento",
                }
              }}
              actions={[
                {
                  icon: () => <TableIcon.Done/>,
                  tooltip: 'Aprovar Quiz',
                  onClick: (event, rowData) => props.updateQuizAuthorization(rowData.id)
                },
                {
                  icon: () => <TableIcon.Clear/>,
                  tooltip: 'Recusar Aprovação',
                  onClick: (event, rowData) => props.deleteEntity(rowData.id)
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
      <QuizDetailDialog open={open} onClose={handleDialogClose} quizID={selectedID}/>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  waitingList: state.prisQuiz.waiting,
  loading: state.prisQuiz.loading,
  updateSuccess: state.prisQuiz.updateSuccess,
  completedQuizzes: state.quiz.completed,
  quizResults: state.quiz.quizResults,
  resultLoading: state.quiz.loading
});

const mapDispatchToProps = {getWaitingList, updateQuizAuthorization, getCompletedQuizzes, getQuizResults, deleteEntity, deleteQuiz};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
