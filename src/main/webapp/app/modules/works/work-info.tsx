import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {translate, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button as RButton, Card, CardBody, CardHeader, CardTitle, Col, Label, Row} from 'reactstrap';
import {Button, CircularProgress} from "@material-ui/core";
import {IRootState} from 'app/shared/reducers';

import {getEntity, getWorkSubs, updateCancelWork, updateCompleteWork, updateEntity} from './work.reducer';
import {getEntities} from 'app/modules/account/prisoner/prisioner.reducer';
import {cancelPressProduct, createEntity} from "app/modules/account/prisoner/press-work.reducer";
import MaterialTable, {Column} from "material-table";
import {StateBox} from "app/components/StateBox";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import WorkSubDialog from "app/modules/works/work-sub-dialog";
import {IPrisioner} from "app/shared/model/prisioner.model";
import workBack from "app/assets/img/trabalhos.jpg";
import pending from "app/assets/img/pending.png";
import completed from "app/assets/img/completed-icon.png";
import canceled from "app/assets/img/cancel-icon.png";
import TableIcon from "app/shared/util/table-icon";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {datePicker} from "app/shared/layout/themes/themes";

const MySwal = withReactContent(Swal);

export interface IWorkUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
}

interface WorkSubs{
  pressID: number;
  pressState: number;
  stateName: string;
}

export const WorkInfo = (props: IWorkUpdateProps) => {
  const classes = datePicker();

  const {workEntity, loading, updating, workSubs, prisoners, prisonersLoading, pressUpdating} = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [stateID, setStateID] = useState(0);
  const [stateImg, setStateImg] = useState(pending);
  const [selectedDate, handleDateChange] = useState<Date>(new Date());
  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Prisioneiro', field: 'prisonerName',
        render: rowData =>
          <div>
            <img src={`data:${rowData.prisonerImageContentType};base64,${rowData.prisonerImage}`}
                 className="prisoner-image"/>
            <p style={{paddingTop: 15}}>{rowData.prisonerName}</p>
          </div>},
      {title: 'Estado', field: 'state', render: rowData => <StateBox boxText={rowData.stateName} stateID={rowData.pressState}/>},
    ]
  });

  const allowWorkActions = stateID !== 1;
  const allowNewSub = allowWorkActions || workEntity.numRemainingEntries === 0;

  function asyncAction(mPressWork) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Async is done!");
        resolve(props.createEntity(mPressWork));
      }, 1000);
    });
  }

  const getImageByState = (id) => {
    switch (id) {
      case 1:
        return pending;
      case 2:
        return completed;
      case 3:
        return canceled;
      default:
        return pending;
    }
  };

  const createPW = (prisoner: IPrisioner) => {
    const mPressWork = { work: workEntity, prisioner: prisoner};

    asyncAction(mPressWork).then(function(success) {
      props.getWorkSubs(props.match.params.id);
      props.getEntity(props.match.params.id);
    });
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
      setStateID(workEntity.state['id']);
      setStateImg(getImageByState(workEntity.state['id']));
      handleDateChange(moment(workEntity.date).toDate());
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

  const clickCompleteWork = (id) => {
    MySwal.fire({
      title: <p>Concluir Trabalho?</p>,
      text: "Não é possivel reverter esta operação!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Concluir!'
    }).then((result) => {
      if (result.value) {
        return props.updateCompleteWork(id);
      }
    }).then((result: any) => {
      console.log(result);
      if(result.value.status === 200){
        console.log("OK");
      }
    })
  };

  const clickCancelPressWork = (id) => {
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

  const getStateName = (id) => {
    switch (id) {
      case 1:
        return "Pendente";
      case 2:
        return "Concluído";
      case 3:
        return "Cancelado";
      default:
        return "Pendente";
    }
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
                    <AvField id="work-nameWork" type="text" name="nameWork" readOnly={allowWorkActions && true}/>
                  </AvGroup>
                  <AvGroup>
                    <Label id="priceHourLabel" for="work-priceHour">
                      <Translate contentKey="lustPrisionApp.work.priceHour">Total Credits</Translate>
                    </Label>
                    <AvField id="work-priceHour" type="string" className="form-control" name="totalCredits" readOnly={allowWorkActions && true}/>
                  </AvGroup>
                  <AvGroup>
                    <Label id="numVacanciesLabel" for="work-numVacancies">
                      <Translate contentKey="lustPrisionApp.work.numVacancies">Remaining Entries</Translate>
                    </Label>
                    <AvField id="work-numVacancies" type="string" className="form-control" name="numRemainingEntries" readOnly={allowWorkActions && true}/>
                  </AvGroup>
                  <AvGroup>
                    <Label id="dateLabel" for="work-date">
                      <Translate contentKey="lustPrisionApp.work.date">Date</Translate>
                    </Label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        disablePast={!allowWorkActions && true}
                        className={`form-control ${classes.datePicker}`}
                        openTo="date"
                        format="dd/MM/yyyy"
                        views={["year", "month", "date"]}
                        value={selectedDate}
                        onChange={handleDateChange}
                        disabled={allowWorkActions && true}
                      />
                      <AvField id="date" type="hidden" name="date" value={selectedDate} validate={{
                        required:{
                          value: true,
                          errorMessage: translate('lustPrisionApp.prisioner.validation.data.required')
                        }
                      }}/>
                    </MuiPickersUtilsProvider>
                  </AvGroup>
                  <RButton tag={Link} id="cancel-save" onClick={handleClose} replace color="info">
                    <FontAwesomeIcon icon="arrow-left"/>
                    &nbsp;
                    <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                  </RButton>
                  &nbsp;
                  <RButton color="primary" id="save-entity" type="submit" disabled={updating || allowWorkActions && true}>
                    <FontAwesomeIcon icon="save"/>
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </RButton>
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
                  src={workBack}
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
                    <h5 className="title">Trabalho {getStateName(workEntity.state['id'])}</h5>
                  </a>
                  <div className="new-sub">
                    <Button variant="contained" color="primary" onClick={dialogOpen}
                            disabled={allowNewSub || pressUpdating}>Adicionar Prisidiário</Button>
                    {pressUpdating && <CircularProgress size={24} />}
                  </div>
                  <div className="complete-cancel">
                    <RButton variant="contained" color="primary" disabled={allowWorkActions}
                      onClick={() => clickCompleteWork(workEntity.id)}
                    >Concluir</RButton>
                    <RButton variant="contained" color="secondary" disabled={allowWorkActions}
                      onClick={() => clickCancelWork(workEntity.id)}
                    >Cancelar</RButton>
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
              icons={TableIcon}
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
                (rowData: WorkSubs) => ({
                  icon: () => <TableIcon.Cancel/>,
                  tooltip: 'Despedir prisidiário',
                  onClick: (event, row) => clickCancelPressWork(row.pressID),
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
              icons={TableIcon}
              columns={state.columns}
              data={...data.filter(user => {return user.pressState === 3})}
              isLoading={loading}
              localization={{
                body: {
                  emptyDataSourceMessage: "Não existem despedimentos neste trabalho",
                }
              }}
              options={{
                search: false,
                headerStyle: {
                  fontWeight: 'bold',
                },
                actionsColumnIndex: -1
              }}
            />
          </Card>
        </Col>
      </Row>
      <WorkSubDialog open={open} onClose={handleDialogClose} data={prisoners} loading={prisonersLoading}/>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  workEntity: state.work.entity,
  workSubs: state.work.workSubs,
  loading: state.work.loading,
  updating: state.work.updating,
  updateSuccess: state.work.updateSuccess,
  prisoners: state.prisioner.entities,
  prisonersLoading: state.prisioner.loading,
  pressUpdating: state.pressWork.updating
});

const mapDispatchToProps = {
  getEntities,
  getEntity,
  updateEntity,
  getWorkSubs,
  updateCancelWork,
  updateCompleteWork,
  cancelPressProduct,
  createEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WorkInfo);
