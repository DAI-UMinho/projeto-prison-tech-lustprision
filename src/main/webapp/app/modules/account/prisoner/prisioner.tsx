import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {getEntities, deleteEntity} from './prisioner.reducer';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import MaterialTable, {MTableToolbar, Column} from 'material-table';

import {withStyles, Theme, createStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import {Moment} from "moment";

import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Ellipsis } from 'react-spinners-css';
import {LinearProgress, useMediaQuery} from "@material-ui/core";
import {translate, Translate} from "react-jhipster";
import CardNewButton from "app/components/CardNewButton";

export interface IPrisionerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
}

export const Prisioner = (props: IPrisionerProps) => {
  const theme = useTheme();
  const mCol = useMediaQuery(theme.breakpoints.up('xl')) ? 10 : 12;
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const [data, setData] = useState([]);
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
      {title: 'Bi', field: 'bi'}
    ]
  });

  useEffect(() => {
    props.getEntities();
  }, []);

  const {prisionerList, match, loading} = props;

  const updateTable = () => {
    setData([...prisionerList]);
  };
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

  return (
    <Row className="justify-content-center">
      <Col lg={mStatCol} md="6" sm="6">
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
                  {loading ? (<Ellipsis color="#99c3ff" size={40}/> )
                    : (<CardTitle tag="p">{prisionerList.length}</CardTitle>)}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <CardNewButton cardClick={() => props.history.push(match.url + '/new')} cardTitle={"Prisioneiro"}/>
      {/*<Translate contentKey="lustPrisionApp.prisioner.home.newCard">New Prisoner</Translate>*/}
      <Col md={mCol}>
        <Card className="card-user">
          <MaterialTable
            title=""
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
