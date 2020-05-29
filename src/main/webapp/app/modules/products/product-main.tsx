import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter, Table} from 'reactstrap';
import {Translate, JhiItemCount, JhiPagination, getSortState} from 'react-jhipster';
import {IRootState} from 'app/shared/reducers';
import {getProductsByPage, getProductsByPageName,getProductsByPagePriceRange} from './product.reducer';
import {getPurchaseTotalNumber, getProductTotalNumber} from "app/shared/reducers/statistics";
import {Theme, createStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Ellipsis } from 'react-spinners-css';
import {IProduct} from 'app/shared/model/product.model';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import SearchBar from "app/components/SearchBar";
import Slider from "@material-ui/core/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useMediaQuery} from "@material-ui/core";
import CardNewButton from "app/components/CardNewButton";
import {productPage} from "app/shared/layout/themes/themes";


export interface IProductProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const ProductOverview = (props: IProductProps) => {
  const classes = productPage();
  const theme = useTheme();
  const mRow = useMediaQuery(theme.breakpoints.up('xl')) ? 2 : 1;
  const mHeight = useMediaQuery(theme.breakpoints.up('xl')) ? 200 : 256;
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const lowGrid = useMediaQuery(theme.breakpoints.up('sm')) ? 4 : 2;
  const gridNumber = useMediaQuery(theme.breakpoints.up('lg')) ? 6 : lowGrid;

  const [pagination, setPagination] = useState(getSortState(props.location, 6));
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [sliderValue, setSliderValue] = React.useState<number[]>([0, 700]);

  useEffect(() => {
    console.log(pagination);
    props.getProductsByPageName(searchValue, sliderValue[0], sliderValue[1], (pagination.activePage || 1)  - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    props.history.push(`${props.location.pathname}?page=${pagination.activePage || 1}&sort=${pagination.sort},${pagination.order}`);
  }, [pagination]);

  useEffect(() => {
    props.getPurchaseTotalNumber(null);
    props.getProductTotalNumber(null);
  }, []);

  const {totalItems, productsPage, match, loading, nSales, nProducts, statLoading} = props;

  const purchaseSelect = (id) => {
    console.log(id);
    props.history.push(`${match.url}/${id}`)};

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });

  const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
    console.log(event);
    //props.getProductsByPageName(searchValue, newValue[0], newValue[1], pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`)
  };

  const searchChange = (e) => {
    const searchQuery = e.target.value.trim();
    setSearchValue(searchQuery);
  };

  useEffect(() => {
    props.getProductsByPageName(searchValue, sliderValue[0], sliderValue[1], pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
  }, [searchValue]);

  useEffect(() => {
    props.getProductsByPageName(searchValue, sliderValue[0], sliderValue[1], pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
  }, [sliderValue]);

  const resetFilters = () => {
    setSliderValue([0, 700]);
    setSearchValue('');
  };

  return (
    <>
      <Row >
        <Col lg={mStatCol} md="6" sm="6">
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
        <Col lg={mStatCol} md="6" sm="6">
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
        <CardNewButton cardClick={() => props.history.push(match.url + '/new')} cardTitle={"Produto"}/>
      </Row>
      <hr/>
      <div className={classes.productWrapper}>
        <div className={classes.sidebar}>
          <SearchBar searchValue={searchValue} onSearchChange={searchChange}/>
          &nbsp;
          <div className={classes.sidebarFilter}>
            <Row>
              <h3 className={classes.filter}>Multi Range</h3>
              <p className={classes.sliderLabel}>{`${sliderValue[0]}-${sliderValue[1]}`}</p>
            </Row>
            <Slider
              value={sliderValue}
              onChangeCommitted={handleChange}
              // onChange={handleChange}
              max={700}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
            />
          </div>
          <Button variant="contained" color="primary" onClick={resetFilters}>Remover Filtros</Button>
        </div>
        {loading ? (
          <div className={classes.gridList}>
            <CircularProgress className={classes.loadingSpinner}/>
          </div>) : (
            <div className={classes.gridList}>
              <GridList cellHeight={mHeight} spacing={3} cols={gridNumber} className={classes.gridList}>
                {productsPage.map((product) => (
                  <GridListTile classes={{imgFullWidth: classes.customImageStyle, imgFullHeight: classes.customImageStyle}} key={product.image} cols={2} rows={mRow} className={classes.gridItem} onClick={() => purchaseSelect(product.id)}>
                    <img src={`data:${product.imageContentType};base64,${product.image}`} alt={product.nameProd} />
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
  // getProductsByName,
  // getProductsByPriceRange,
  getProductsByPage,
  getProductsByPageName,
  getProductsByPagePriceRange,
  getPurchaseTotalNumber,
  getProductTotalNumber,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);
