import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {getEntities, deleteEntity} from './prisioner.reducer';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import MaterialTable, {MTableToolbar, Column} from 'material-table';

import {withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Moment} from "moment";

import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface IPrisionerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
  data: Array<any>;
}

export const Prisioner = (props: IPrisionerProps) => {

  const [data, setData] = useState([]);
  // @ts-ignore
  const [state, setState] = React.useState<TableState>({
    columns: [
      {
        title: 'Name', field: 'name',
        render: rowData =>
          <div>
            <img src={`data:${rowData.profileImageContentType};base64,${rowData.profileImage}`}
                 style={{width: 50, borderRadius: '50%', float: 'left', marginRight: 10}}/>
            <p style={{paddingTop: 15}}>{rowData.name}</p>
          </div>
      },
      {title: 'Prisoner Num', field: 'numPrisioner'},
      {title: 'Data Nascimento', field: 'dataNascimento', type: 'date'},
      {title: 'Balance', field: 'balance'},
      {title: 'Bi', field: 'bi'},
    ]
  });

  useEffect(() => {
    props.getEntities();
  }, []);

  const {prisionerList, match, loading} = props;

  useEffect(() => {
    {
      prisionerList && prisionerList.length > 0 ? updateTable() : console.log("NO")
    }
  }, [prisionerList]);


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

  const updateTable = () => {
    setData([...prisionerList]);
  };

  return (
    <Row className="justify-content-center">
      <Col lg="3" md="6" sm="6">
        <Card className="card-stats">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-single-02 text-warning"/>
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <p className="card-category">Número de Prisioneiros</p>
                  <CardTitle tag="p">{prisionerList.length}</CardTitle>
                  <p/>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3" md="6" sm="6">
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
                  <CardTitle tag="p">0</CardTitle>
                  <p/>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg="3" md="6" sm="6">
        <div className="card-hover" onClick={() => props.history.push(match.url + '/new')}>
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
                    <CardTitle tag="p" style={{color: '#ffffff'}}>New Prisoner</CardTitle>
                    <p/>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </Col>
      <Col md="10">
        <Card className="card-user">
          <MaterialTable
            title="Presidiários"
            columns={state.columns}
            data={data}
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
            editable={{
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    props.deleteEntity(oldData.id);
                    resolve();
                  }, 5000);
                }),
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({prisioner}: IRootState) => ({
  prisionerList: prisioner.entities,
  loading: prisioner.loading,
});

const mapDispatchToProps = {getEntities, deleteEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Prisioner);
