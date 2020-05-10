import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Badge} from 'reactstrap';
import {makeStyles, withStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Col, Card} from 'reactstrap';
import {Translate, TextFormat, JhiPagination, JhiItemCount, getSortState} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {getUsers, updateUser} from './user-management.reducer';
import {IRootState} from 'app/shared/reducers';
import {Column} from "material-table";

interface TableState {
  columns: Array<Column<any>>;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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
    },
  }),
)(TableCell);

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export const Employee = (props: IUserManagementProps) => {
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  useEffect(() => {
    props.getUsers(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
  }, [pagination]);

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

  const classes = useStyles();
  const {users, account, match, totalItems} = props;
  return (
    <div>
      <Row className="justify-content-center">
        <Col lg="10" md="6" sm="6">
          <Card className="card-stats">
        {/*      <Table responsive striped>
          <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('login')}>
                <Translate contentKey="userManagement.login">Login</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('email')}>
                <Translate contentKey="userManagement.email">Email</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('createdDate')}>
                <Translate contentKey="userManagement.createdDate">Created Date</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
              <th className="hand" onClick={sort('lastModifiedBy')}>
                <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
              <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
                <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.filter(function (user) {
              return user.authorities.length == 1;})
              .map((user, i) => (
              <tr id={user.login} key={`user-${i}`} >
                <td>
                  <Button tag={Link} to={`${match.url}/${user.login}`} color="link" size="sm">
                    {user.id}
                  </Button>
                </td>
                <td>{user.login}</td>
                <td>{user.email}</td>
                <td>
                  {user.activated ? (
                    <Button color="success" onClick={toggleActive(user)}>
                      <Translate contentKey="userManagement.activated">Activated</Translate>
                    </Button>
                  ) : (
                    <Button color="danger" onClick={toggleActive(user)}>
                      <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                    </Button>
                  )}
                </td>
                <td>
                  <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                </td>
                <td>{user.lastModifiedBy}</td>
                <td>
                  <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                </td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button tag={Link} to={`${match.url}/${user.login}`} color="info" size="sm">
                      <FontAwesomeIcon icon="eye" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.view">View</Translate>
                      </span>
                    </Button>
                    <Button tag={Link} to={`${match.url}/${user.login}/edit`} color="primary" size="sm">
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                      </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${user.login}/delete`}
                      color="danger"
                      size="sm"
                      disabled={account.login === user.login}
                    >
                      <FontAwesomeIcon icon="trash" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                      </span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>*/}
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.filter(function (user) {
                    return user.authorities.length === 1;
                  })
                    .map((user, i) => (
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
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account
});

const mapDispatchToProps = {getUsers, updateUser};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
