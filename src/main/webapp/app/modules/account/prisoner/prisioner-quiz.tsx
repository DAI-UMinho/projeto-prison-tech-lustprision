import React, {useState, useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle} from 'reactstrap';
import {Translate, ICrudGetAllAction, TextFormat, translate, setFileData, openFile} from 'react-jhipster';
import MaterialTable, {Column} from "material-table";
import { getPrisionerQuizs} from "app/modules/account/prisoner/prisioner.reducer";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useTheme} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";

const MySwal = withReactContent(Swal);

export interface IPrisionerQuizProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string  }>{
}

interface TableState {
  columns: Array<Column<any>>;
}

export const PrisionerQuiz = (props: IPrisionerQuizProps) => {
  const theme = useTheme();
  const colN = useMediaQuery(theme.breakpoints.down('lg')) ? 10 : 8;

  const { prisionerQuizs } = props;
  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Identificação', field: 'id', render: rowData => <i>#{rowData.id}</i>},
      {title: 'Number of Question', field: 'qtyQuestion'},
      {title: 'Date', field: 'quizDate', type: 'date'},
      // {title: 'Estado', field: 'state', render: rowData => <span className="span-status" style={{border: '1px solid rgb(67, 160, 71)', color: 'rgb(67, 160, 71)'}}>CONCLUIDO</span>},
    ]
  });

  console.log(prisionerQuizs);

  return (
    <Row className="justify-content-center">
      <Col md={colN}>
        <Card className="card-user justify-content-center">
          <MaterialTable
            title="Todos os Quizs"
            columns={state.columns}
            data={prisionerQuizs}
            onRowClick={((evt, selectedRow) => {})}
            options={{
              headerStyle: {
                backgroundColor: '#8a8a8a',
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
                icon: 'delete',
                tooltip: 'Remover Quiz',
                onClick: (event, rowData) => {
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
                      Swal.fire(
                        'Removido!',
                        'O trabalho foi removido da conta do presidiário',
                        'success'
                      )
                    }
                  })
                }
              }
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
};
const mapStateToProps = ({prisioner}: IRootState) => ({
  prisionerQuizs: prisioner.quizs,
});

const mapDispatchToProps = {getPrisionerQuizs};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerQuiz);
