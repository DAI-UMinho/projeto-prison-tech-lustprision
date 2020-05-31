import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {makeStyles, withStyles, createStyles, Theme, useTheme} from '@material-ui/core/styles';
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Label, Row} from 'reactstrap';
import {Translate, TextFormat, JhiPagination, JhiItemCount, getSortState} from 'react-jhipster';
import { Ellipsis } from 'react-spinners-css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {getUsers, updateUser, deleteUser} from './user-management.reducer';
import {IRootState} from 'app/shared/reducers';
import {useMediaQuery} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import CardNewButton from "app/components/CardNewButton";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  loadingSpinner:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  gridList: {
    width: '100%',
    overflow: 'hidden'
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "rgb(1, 87, 155)",
      color: theme.palette.common.white,
      fontWeight: 'bold'
    },
    body: {
      fontSize: 14,
    }
  }),
)(TableCell);

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export const Employee = (props: IUserManagementProps) => {
  const theme = useTheme();
  const mCol = useMediaQuery(theme.breakpoints.down('lg')) ? 12 : 10;
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  useEffect(() => {
    props.getUsers(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
  }, [pagination]);

  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });

  const toggleActive = user => () =>
    props.updateUser({
      ...user,
      activated: !user.activated
    });

  const deleteEmployee = login => {
    MySwal.fire({
      title: <p>Apagar Funcionário?</p>,
      text: "Não é possivel reverter esta operação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Apagar!'
    }).then((result) => {
      if (result.value) {
         props.deleteUser(login);
      }
    })
  };



  const classes = useStyles();
  const {users, account, match, totalItems, loading} = props;
  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={mStatCol} md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-badge text-warning"/>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Nº Funcionários</p>
                    {loading ? (<Ellipsis color="#99c3ff" size={40}/> )
                      : (<CardTitle tag="p">{users.length}</CardTitle>)}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <CardNewButton cardClick={() => props.history.push(match.url + '/new')} cardTitle={"Funcionário"}/>
      </Row>
      <Row className="justify-content-center">
        <Col lg={mCol} md="6" sm="6">
          <Card className="card-stats">
            {loading ? (
              <div className={classes.gridList}>
                <CircularProgress className={classes.loadingSpinner}/>
              </div>) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow style={{fontWeight: 'bold'}}>
                    <StyledTableCell>Codigo</StyledTableCell>
                    <StyledTableCell align="right">Login</StyledTableCell>
                    <StyledTableCell align="right">Email&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Activated&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Created Date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Last Modified By&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Last Modified Date&nbsp;</StyledTableCell>
                    <StyledTableCell align="right">Eliminar&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, i) => (
                      <TableRow key={user.login}>
                        <TableCell component="th" scope="row">
                          <Button tag={Link} to={`${match.url}/${user.login}`} color="link" size="sm">
                            {user.id}
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <img src={`data:${user.profileImageContentType};base64,${user.profileImage}`}
                               style={{width: 50, borderRadius: '50%', float: 'left', marginRight: 8}}/>
                          <p style={{paddingTop: 15, display: 'flex'}}>{user.login}</p>
                        </TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                        <TableCell align="right">
                          {user.activated ? (
                            <Button color="success" onClick={toggleActive(user)}>
                              <Translate contentKey="userManagement.activated">Activated</Translate>
                            </Button>
                          ) : (
                            <Button color="danger" onClick={toggleActive(user)}>
                              <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid/>
                        </TableCell>
                        <TableCell align="right">{user.lastModifiedBy}</TableCell>
                        <TableCell align="right">
                          <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                        </TableCell>
                        <TableCell align="right">
                         <DeleteIcon onClick={() => deleteEmployee(user.login)}/>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            )}
          </Card>
        </Col>
      </Row>
      <div className={users && users.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage}
                        i18nEnabled/>
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={pagination.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={pagination.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.userManagement.loading,
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account
});

const mapDispatchToProps = {getUsers, updateUser, deleteUser};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
