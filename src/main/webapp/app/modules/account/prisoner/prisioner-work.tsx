import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Col, Row, Card, CardBody, CardTitle} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {getPrisionerWorks} from './prisioner.reducer';
import {deleteWork} from "app/entities/work/work.reducer";
import MaterialTable, {Column} from "material-table";
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from "app/config/constants";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {TextFormat} from "react-jhipster";

const MySwal = withReactContent(Swal);

interface TableState {
  columns: Array<Column<any>>;
}

export interface IPrisionerWorkProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string  }> {
}

export const PrisionerWork = (props: IPrisionerWorkProps) => {
  const [data, setData] = useState([]);
  const {prisionerWorks, updateSuccess} = props;

  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Identificação', field: 'id', render: rowData => <i>#{rowData.id}</i>},
      {title: 'Nome', field: 'nameWork'},
      {title: 'Data', field: 'dateWork', type: 'date'},
      {title: 'Créditos', field: 'totalCredits'},
      {title: 'Estado', field: 'state', render: rowData => <span className="span-status" style={{border: '1px solid rgb(67, 160, 71)', color: 'rgb(67, 160, 71)'}}>CONCLUIDO</span>},
    ]
  });

  return (
    <Row className="justify-content-center">
      <Col md="8">
        <Card className="card-user justify-content-center">
            <MaterialTable
              title="Trabalhos Realizados"
              columns={state.columns}
              data={prisionerWorks}
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
                  tooltip: 'Remover trabalho',
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
                        return props.deleteWork(rowData.id);
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
                  <CardTitle tag="p">0</CardTitle>
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
                  <CardTitle tag="p">0</CardTitle>
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
                  <CardTitle tag="p">0</CardTitle>
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
});

const mapDispatchToProps = {getPrisionerWorks, deleteWork};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisionerWork);
