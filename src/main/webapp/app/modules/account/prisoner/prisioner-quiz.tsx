import React, {useState, useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle} from 'reactstrap';
import {Translate, ICrudGetAllAction, TextFormat, translate, setFileData, openFile} from 'react-jhipster';
import MaterialTable, {Column} from "material-table";
import {getPrisionerQuizs} from "app/modules/account/prisoner/prisioner.reducer";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useTheme} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import {QuizBox} from "app/components/StateBox";
import TableIcon from "app/shared/util/table-icon";
import QuizDetailDialog from "app/modules/quizs/quiz-details";
import {deleteQuiz, getQuizResults} from "app/modules/quizs/quiz.reducer";

const MySwal = withReactContent(Swal);

export interface IPrisionerQuizProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
}

export const PrisionerQuiz = (props: IPrisionerQuizProps) => {
  const theme = useTheme();
  const colN = useMediaQuery(theme.breakpoints.down('lg')) ? 10 : 8;
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const [selectedID, setSelectedID] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const {prisionerQuizs} = props;
  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Identificação', field: 'id', render: rowData => <i>#{rowData.id}</i>},
      {title: 'Date', field: 'quizDate', type: 'date'},
      {
        title: 'Score', field: 'score',
        render: rowData => <QuizBox correctAnswers={rowData.correctAnswers} nQuestions={rowData.qtyQuestion}/>
      },
      // {title: 'Estado', field: 'state', render: rowData => <span className="span-status" style={{border: '1px solid rgb(67, 160, 71)', color: 'rgb(67, 160, 71)'}}>CONCLUIDO</span>},
    ]
  });


  const handleDialogClose = (value: string) => {
    setOpen(false);
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={colN}>
          <Card className="card-user justify-content-center">
            <MaterialTable
              title="Todos os Quizs"
              icons={TableIcon}
              columns={state.columns}
              data={prisionerQuizs}
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
                {
                  icon: () => <TableIcon.Delete/>,
                  tooltip: 'Remover Quiz',
                  onClick: (event, rowData) =>
                    MySwal.fire({
                      title: <p>Quer apagar o Quiz?</p>,
                      text: "Não é possivel reverter esta operação!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Apagar!'
                    }).then((result) => {
                      if (result.value) {
                        return props.deleteQuiz(rowData.quizID);
                      }
                    }).then((result: any) => {
                      if(result.value.status === 200){
                        Swal.fire(
                          'Removido!',
                          'O quiz foi removido da conta do presidiário',
                          'success'
                        )
                      }
                    })
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
      <QuizDetailDialog open={open} onClose={handleDialogClose} quizID={selectedID}/>
    </>
  );
};
const mapStateToProps = (state: IRootState) => ({
  prisionerQuizs: state.prisioner.quizzes,
  quizResults: state.quiz.quizResults,
  resultLoading: state.quiz.loading
});

const mapDispatchToProps = {getPrisionerQuizs, getQuizResults, deleteQuiz};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerQuiz);
