import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {AvFeedback, AvForm, AvGroup, AvInput, AvField} from 'availity-reactstrap-validation';
import {TextFormat, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Row, Col, Card, CardHeader, CardBody, CardTitle, CardFooter, Label} from 'reactstrap';
import {IRootState} from 'app/shared/reducers';

import {getEntity, updateEntity, getWorkSubs} from './work.reducer';
import { getEntities } from 'app/modules/account/prisoner/prisioner.reducer';
import {cancelPressProduct, createEntity} from "app/modules/account/prisoner/press-work.reducer";
import {IWork} from 'app/shared/model/work.model';
import MaterialTable, {Column} from "material-table";
import {APP_DATE_FORMAT} from "app/config/constants";
import StateBox from "app/components/StateBox";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import WorkSubDialog from "app/modules/works/work-sub-dialog";
import { IPressWork } from "app/shared/model/press-work.model"
import {IPrisioner} from "app/shared/model/prisioner.model";
import userBack from "app/assets/img/damir-bosnjak.jpg";
import pending from "app/assets/img/pending.png";
import completed from "app/assets/img/completed-icon.png";
import canceled from "app/assets/img/cancel-icon.png";
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';

const MySwal = withReactContent(Swal);

export interface IWorkUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
}

export const WorkInfo = (props: IWorkUpdateProps) => {

  const {workEntity, loading, updating, workSubs, prisoners} = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [stateID, setStateID] = useState(0);
  const [stateImg, setStateImg] = useState(pending);
  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Prisioneiro', field: 'prisonerName',
        render: rowData =>
          <div>
            <img src={`data:${rowData.prisonerImageContentType};base64,${rowData.prisonerImage}`}
                 style={{width: 50, borderRadius: '50%', float: 'left', marginRight: 10}}/>
            <p style={{paddingTop: 15}}>{rowData.prisonerName}</p>
          </div>},
      {title: 'Estado', field: 'state', render: rowData => <StateBox boxText={rowData.stateName} stateID={rowData.pressState}/>},
    ]
  });

  const allowWorkActions = stateID !== 1;
  const allowNewSub = allowWorkActions && workEntity.numRemainingEntries !== 0;

  const createPW = (prisoner: IPrisioner) => {
    const mPressWork = { work: workEntity, prisioner: prisoner};

    props.createEntity(mPressWork);
    props.getWorkSubs(props.match.params.id);
  };

  const handleClose = () => {
    props.history.push('/dashboard/works');
  };

  const updateTable = () => {
    setData([...workSubs]);
  };

  const dialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = (result?) => {
    setOpen(false);
    if(result){ createPW(result); }
  };

  useEffect(() => {
    props.getEntity(props.match.params.id);
    props.getWorkSubs(props.match.params.id);
  }, []);

  useEffect(() => {
    if(workEntity.state){
      setStateID(workEntity.state.id);
      setStateImg(getImageByState(workEntity.state.id));
    }
  }, [workEntity]);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    updateTable();
  }, [workSubs]);

  useEffect(() => {
    if(open){ props.getEntities(); }
  }, [open]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...workEntity,
        ...values
      };

      props.updateEntity(entity);
    }
  };

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
      if(result.value.status === 200){
        props.getWorkSubs(props.match.params.id)
      }
    })
  };

  return (
    <div>
      <Row>
        <Col md="8">
          <Card className="card-user justify-content-center">
            <CardHeader>
              <CardTitle tag="h5">Editar Trabalho</CardTitle>
            </CardHeader>
            <CardBody>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={workEntity} onSubmit={saveEntity}>
                  <AvGroup>
                    <Label for="work-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="work-id" type="text" className="form-control" name="id" required readOnly/>
                  </AvGroup>
                  <AvGroup>
                    <Label id="nameWorkLabel" for="work-nameWork">
                      <Translate contentKey="lustPrisionApp.work.nameWork">Name Work</Translate>
                    </Label>
                    <AvField id="work-nameWork" type="text" name="nameWork"/>
                  </AvGroup>
                  <AvGroup>
                    <Label id="priceHourLabel" for="work-priceHour">
                      <Translate contentKey="lustPrisionApp.work.priceHour">Price Hour</Translate>
                    </Label>
                    <AvField id="work-priceHour" type="string" className="form-control" name="totalCredits"/>
                  </AvGroup>
                  <AvGroup>
                    <Label id="numVacanciesLabel" for="work-numVacancies">
                      <Translate contentKey="lustPrisionApp.work.numVacancies">Num Vacancies</Translate>
                    </Label>
                    <AvField id="work-numVacancies" type="string" className="form-control" name="numRemainingEntries"/>
                  </AvGroup>
                  <AvGroup>
                    <Label id="dateLabel" for="work-date">
                      <Translate contentKey="lustPrisionApp.work.date">Date</Translate>
                    </Label>
                    <AvField id="work-date" type="date" className="form-control" name="date"/>
                  </AvGroup>
                  <Button tag={Link} id="cancel-save" onClick={handleClose} replace color="info">
                    <FontAwesomeIcon icon="arrow-left"/>
                    &nbsp;
                    <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                  </Button>
                  &nbsp;
                  <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save"/>
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </Button>
                </AvForm>
              )}
            </CardBody>
          </Card>
        </Col>
        {workEntity.state ? (
        <Col md="4">
          <Card className="card-user justify-content-center">
            <div className="image">
              <img
                alt="..."
                src={userBack}
              />
            </div>
            <CardBody>
              <div className="author">
                <a onClick={e => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={stateImg}
                  />
                  <h5 className="title">Trabalho {getStateName(workEntity.state.id)}</h5>
                </a>
                <Button onClick={dialogOpen} disabled={allowNewSub}>Adicionar Prisidiário</Button>
                <p className="description">5/10 Vagas Restantes</p>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={allowWorkActions}
                    // className={classes.button}
                    startIcon={<DoneIcon />}
                  >Concluir</Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={allowWorkActions}
                    // className={classes.button}
                    startIcon={<CancelIcon />}
                  >Cancelar</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        ) : null}
      </Row>
      <Row>
        <Col md="7">
          <Card className="card-user">
            <MaterialTable
              title="Subscritores"
              columns={state.columns}
              data={...data.filter(user => {return user.pressState < 3})}
              isLoading={loading}
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
                  emptyDataSourceMessage: "Não existem prisidiários inscritos neste trabalho",
                }
              }}
              actions={[
                rowData => ({
                  icon: 'cancel',
                  tooltip: 'Despedir prisidiário',
                  onClick: (event, row) => clickCancelWork(row.pressID),
                  disabled: rowData.pressState > 1
                })
              ]}
            />
          </Card>
        </Col>
        <Col md="5">
          <Card className="card-user">
            <MaterialTable
              title="Despedimentos"
              columns={state.columns}
              data={...data.filter(user => {return user.pressState === 3})}
              isLoading={loading}
              localization={{
                body: {
                  emptyDataSourceMessage: "Não existem despedimentos neste trabalho",
                }
              }}
              options={{
                headerStyle: {
                  fontWeight: 'bold',
                },
                actionsColumnIndex: -1
              }}
            />
          </Card>
        </Col>
      </Row>
      <WorkSubDialog open={open} onClose={handleDialogClose} data={prisoners}/>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  workEntity: state.work.entity,
  workSubs: state.work.workSubs,
  loading: state.work.loading,
  updating: state.work.updating,
  updateSuccess: state.work.updateSuccess,
  prisoners: state.prisioner.entities
});

const mapDispatchToProps = {
  getEntities,
  getEntity,
  updateEntity,
  getWorkSubs,
  cancelPressProduct,
  createEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkInfo);


const getImageByState = (id) => {
  switch (id) {
    case 1:
      return pending;
    case 2:
      return completed;
    case 3:
      return canceled;
  }
};

const getStateName = (id) => {
  switch (id) {
    case 1:
      return "Pendente";
    case 2:
      return "Concluído";
    case 3:
      return "Cancelado";
  }
};
