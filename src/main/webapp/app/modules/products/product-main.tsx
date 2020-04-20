import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter, Table} from 'reactstrap';
import {Translate, JhiItemCount, JhiPagination, getSortState} from 'react-jhipster';

import {IRootState} from 'app/shared/reducers';
import {getProductsByName, getProductsByPriceRange, getProductsByPage, getProductsByPageName,getProductsByPagePriceRange} from './product.reducer';
import {getPurchaseTotalNumber, getProductTotalNumber, getPrisonerCompletedWorks} from "app/shared/reducers/statistics";
import {Theme, createStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Ellipsis } from 'react-spinners-css';
import {IProduct} from 'app/shared/model/product.model';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import SearchBar from "app/components/SearchBar";
import Slider from "@material-ui/core/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {useMediaQuery} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 'auto',
      overflow: 'hidden'
    },
    gridPrice: {
      color: 'rgb(255,255,255)',
      margin: '10px'
    },
    productWrapper: {
      width: '100%',
      display: 'flex'
    },
    gridItem: {
      borderRadius: 10,
      '&:hover': {
        cursor: 'pointer'
      }
    },
    loadingSpinner:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    sidebarFilter: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: '15px 25px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(233, 233, 233)',
      borderImage: 'initial',
      borderRadius: '3px'
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      margin: '0px 30px 0px 0px',
      transition: 'all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s',
      [theme.breakpoints.up('lg')]: {
        width: '240px',
      },
      [theme.breakpoints.up('xl')]: {
        width: '340px',
      },
    },
    filter: {
      fontSize: '14px',
      fontWeight: 700,
      color: 'rgb(50, 51, 50)',
      lineHeight: 1.3,
      display: 'flex',
      margin: '0px 0px 20px'
    },
    pagination: {
      marginTop: '10px'
    }
  }),
);


export interface IProductProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const ProductOverview = (props: IProductProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const mRow = useMediaQuery(theme.breakpoints.up('xl')) ? 2 : 1;
  const mHeight = useMediaQuery(theme.breakpoints.up('xl')) ? 200 : 256;

  const [pagination, setPagination] = useState(getSortState(props.location, 6));
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [sliderValue, setSliderValue] = React.useState<number[]>([0, 200]);

  useEffect(() => {
    console.log(pagination);
    props.getProductsByPageName(searchValue, sliderValue[0], sliderValue[1], pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
  }, [pagination]);

  useEffect(() => {
    props.getPurchaseTotalNumber();
    props.getProductTotalNumber();
  }, []);

  const {totalItems, productsPage, match, loading, nSales, nProducts, statLoading} = props;

  const purchaseSelect = (id) => {
    console.log(id);
    props.history.push(`${match.url}/${id}`);}

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });

  const handleChange = (event: any, newValue: number | number[]) => {
    // props.getProductsByPriceRange(newValue[0], newValue[1]);
    setSliderValue(newValue as number[]);
    props.getProductsByPageName(searchValue, newValue[0], newValue[1], pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`)
  };

  const searchChange = (e) => {
    // props.getProductsByName(searchQuery);
    const searchQuery = e.target.value.trim();
    setSearchValue(searchQuery);
    props.getProductsByPageName(searchQuery, sliderValue[0], sliderValue[1], pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`)
  };

  return (
    <>
      <Row >
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-bag-16 text-success"/>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Número de Produtos</p>
                    {statLoading ? (<Ellipsis color="#99c3ff" size={40}/>)
                      : (<CardTitle tag="p">{nProducts}</CardTitle>)}
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
                    <p className="card-category">Número de Vendas</p>
                    {statLoading ? (<Ellipsis color="#99c3ff" size={40}/>)
                      : (<CardTitle tag="p">{nSales}</CardTitle>)}
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
                    <i className="nc-icon nc-single-02 text-warning"/>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Número de Prisioneiros</p>
                    {loading ? (<Ellipsis color="#99c3ff" size={40}/>)
                      : (<CardTitle tag="p"></CardTitle>)}
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
                      <CardTitle tag="p" style={{color: '#ffffff'}}>
                        <Translate contentKey="lustPrisionApp.product.home.newCard">Product</Translate>
                      </CardTitle>
                      <p/>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
      <hr/>
      <div className={classes.productWrapper}>
        <div className={classes.sidebar}>
          <SearchBar onSearchChange={searchChange}/>
          &nbsp;
          <div className={classes.sidebarFilter}>
            <h3 className={classes.filter}>Multi Range</h3>
            <Slider
              value={sliderValue}
              onChangeCommitted={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
          </div>
        </div>
        {loading ? (
          <div className={classes.gridList}>
            <CircularProgress className={classes.loadingSpinner}/>
          </div>) : (
            <div>
              <GridList cellHeight={mHeight} spacing={3} cols={6} className={classes.gridList}>
                {productsPage.map((product) => (
                  <GridListTile key={product.image} cols={2} rows={mRow} className={classes.gridItem} onClick={() => purchaseSelect(product.id)}>
                    <img src={`data:${product.imageContentType};base64,${product.image}`} alt={product.nameProd}/>
                    <GridListTileBar
                      title={product.nameProd}
                      subtitle={<span>by: {product.seler}</span>}
                      actionIcon={
                        /*<IconButton aria-label={`info about ${product.nameProd}`} className={classes.icon}>
                          <InfoIcon/>
                        </IconButton>*/
                        <h3 className={classes.gridPrice}>{product.price}</h3>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
              <div className={productsPage && productsPage.length > 0 ? classes.pagination : 'd-none'}>
                <Row className="justify-content-center">
                  <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
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
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({product, statistics}: IRootState) => ({
  productsPage: product.productsPage,
  totalItems: product.totalItems,
  loading: product.loading,
  nProducts: statistics.nProducts,
  nSales: statistics.nSales,
  statLoading: statistics.loading,
  statError: statistics.errorMessage
});

const mapDispatchToProps = {
  getProductsByName,
  getProductsByPriceRange,
  getProductsByPage,
  getProductsByPageName,
  getProductsByPagePriceRange,
  getPurchaseTotalNumber,
  getProductTotalNumber,
  getPrisonerCompletedWorks
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);
