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
import {getWaitingList} from "app/modules/quizs/pris-quiz.reducer";
import {getEntities, createEntity, updateEntity} from "app/modules/quizs/question.reducer";
import StateBox from "app/components/StateBox";
import Swal from "sweetalert2";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import QuestionUpdate from "app/modules/quizs/question-update";

export interface IQuizProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

interface TableState {
questions: Array<Column<any>>;
}

export const Question = (props: IQuizProps) => {
  const theme = useTheme();
  const mCol = useMediaQuery(theme.breakpoints.up('xl')) ? 8 : 10;
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const [open, setOpen] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [selQuestion, setSelQuestion] = React.useState<any>(1);

  const [state, setState] = React.useState<TableState>({
    questions: [
      {title: 'Questão', field: 'question'},
      {title: 'Resposta', field: 'answer'},
    ]
  });

  const {questions, match, loading, updateSuccess} = props;

  const handleDialogClose = (value: string) => {
    setOpen(false);
  };

  const questionClick = id => {
    setSelQuestion(id);
    setOpen(true);
  };

  useEffect(() => {
    props.getWaitingList();
    props.getEntities();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [updateSuccess]);

  useEffect(() => {
    {
      questions && questions.length > 0 ? setQuestionList([...questions]) : console.log("NO")
    }
  }, [questions]);

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
                    <p className="card-category">Nº Questões</p>
                    {loading ? (<Ellipsis color="#99c3ff" size={40}/> )
                      : (<CardTitle tag="p">{questions.length}</CardTitle>)}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg={mStatCol} md="6" sm="6">
          <div className="card-hover" onClick={() => setOpen(true)}>
            <Card className="card-stats">
              <CardBody style={{backgroundColor: "#6DB65B", borderRadius: '12px'}}>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center">
                      <FontAwesomeIcon style={{color: "#284a25"}} icon={faPlusCircle}/>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <CardTitle tag="p" style={{color: '#ffffff'}}>Questão</CardTitle>
                      <p/>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={mCol}>
          <Card className="card-user">
            <MaterialTable
              title="Questões"
              columns={state.questions}
              data={questionList}
              isLoading={loading}
              onRowClick={((evt, selectedRow) => questionClick(selectedRow))}
              options={{
                headerStyle: {
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
            />
          </Card>
        </Col>
      </Row>
      <QuestionUpdate open={open} onClose={handleDialogClose} question={selQuestion}/>
    </div>
  );
};

  const mapStateToProps = ({question}: IRootState) => ({
    questions: question.entities,
    loading: question.loading,
    updateSuccess: question.updateSuccess
});

const mapDispatchToProps = {getWaitingList, getEntities, createEntity, updateEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
