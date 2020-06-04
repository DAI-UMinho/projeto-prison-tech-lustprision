import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {Button as RButton, Col, Row, Card, CardHeader, CardBody, CardTitle, CardFooter, Label} from 'reactstrap';
import {AvFeedback, AvForm, AvGroup, AvInput, AvField} from 'availity-reactstrap-validation';
import {Translate, translate, setFileData, openFile, byteSize, TextFormat,} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';

import {getEntity, updateEntity, setBlob, getProductSales, deleteEntity} from './product.reducer';
import {getSellers} from "app/modules/products/seller.reducer";

import CloseIcon from '@material-ui/icons/Close';
import MaterialTable, {Column} from "material-table";
import {APP_DATE_FORMAT, AUTHORITIES} from "app/config/constants";
import TableIcon from "app/shared/util/table-icon";
import {Fab, useMediaQuery} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import {Bar} from "react-chartjs-2";
import {getChartProductSales} from "app/shared/reducers/statistics";
import ProductLogs from "app/modules/products/product-logs";
import EventNoteIcon from "@material-ui/icons/EventNote";
import {hasAnyAuthority} from "app/shared/auth/private-route";
import {logPages} from "app/shared/layout/themes/themes";

export interface IProductUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

interface TableState {
  columns: Array<Column<any>>;
}

export const ProductEdit = (props: IProductUpdateProps) => {
  const classes = logPages();
  const theme = useTheme();
  const colN = useMediaQuery(theme.breakpoints.down('lg')) ? 10 : 6;

  const [chartProduct, setChartProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState<TableState>({
    columns: [
      {
        title: 'Prisioneiro', field: 'prisonerName',
        render: rowData =>
          <div>
            <img src={`data:${rowData.prisonerImageContentType};base64,${rowData.prisonerImage}`}
                 style={{width: 50, borderRadius: '50%', float: 'left', marginRight: 10}}/>
            <p style={{paddingTop: 15}}>{rowData.prisonerName}</p>
          </div>
      },
      {
        title: 'Data',
        field: 'purchaseDate',
        type: 'datetime',
        render: rowData => <TextFormat value={rowData.purchaseDate} type="date" format={APP_DATE_FORMAT}
                                       blankOnInvalid/>
      },
      {title: 'Quantidade', field: 'qty'},
      {title: 'Valor Total', field: 'priceTotal'},
    ]
  });
  const {productEntity, loading, updating, productSales, chartSales, isAdmin, sellers} = props;
  const {image, imageContentType} = productEntity;

  const handleClose = () => {
    props.history.goBack();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.getSellers();
    props.getProductSales(props.match.params.id);
    props.getChartProductSales(props.match.params.id);
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    {chartSales && setChartProduct(chartSales.map(x => x.value))}

  }, [chartSales]);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productEntity,
        ...values
      };

      props.updateEntity(entity);
    }
  };

  const deleteProduct = () => {
    props.deleteEntity(productEntity.id);
  };

  const chartData = {
    labels: chartSales.map(x => x.monthName),
    datasets: [
      {
        label: 'Vendas',
        backgroundColor: 'rgba(38,120,255,0.36)',
        borderColor: 'rgba(33,94,205)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(38,120,255,0.36)',
        hoverBorderColor: 'rgb(33,94,205)',
        data: chartProduct
      }
    ]
  };

  return (
    <div>
      {isAdmin &&
      <Row className="justify-content-end">
        <Fab aria-label="edit"
             variant="extended"
             size="medium"
             color="primary"
             className={classes.logButton}
             onClick={() => setOpen(true)}>
          <EventNoteIcon className={classes.extendedIcon}/>
          Logs
        </Fab>
      </Row>}
      <Row className="justify-content-center">
        <Col md="4">
          <Card className="card-user">
            <CardBody>
              {image ? (
                <div className="center-div-alone">
                  <a onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="product-avatar border-gray"
                      src={`data:${imageContentType};base64,${image}`}
                    />
                    <h5 className="title"></h5>
                  </a>
                  <p className="description"></p>
                </div>
              ) : null}
            </CardBody>
            <CardFooter>
              <hr/>
              <Row className="row justify-content-center">
                {!image ? (
                    <div className="file-drop-area">
                      <span className="fake-btn">Choose files</span>
                      <span className="file-msg">or drag and drop files here</span>
                      <input className="file-input" id="file_profileImage" type="file"
                             onChange={onBlobChange(true, 'image')} accept="image/*"/>
                    </div>) :
                  (<Button variant="contained" color="secondary" startIcon={<CloseIcon/>}
                           onClick={clearBlob('image')}>Remover Imagem</Button>)}
              </Row>
            </CardFooter>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-user justify-content-center">
            <CardHeader>
              <CardTitle tag="h5">Editar Produto</CardTitle>
            </CardHeader>
            <CardBody>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={productEntity} onSubmit={saveEntity}>
                    <AvGroup>
                      <Label for="product-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="product-id" type="text" className="form-control" name="id" required readOnly/>
                    </AvGroup>
                  <div className="row">
                    <div className="pr-1 col-md-6">
                      <AvGroup>
                        <Label id="nameProdLabel" for="product-nameProd">
                          <Translate contentKey="lustPrisionApp.product.nameProd">Name Produdct</Translate>
                        </Label>
                        <AvField id="product-nameProd" type="text" name="nameProd"
                                 validate={{
                                   required: {
                                     value: true,
                                     errorMessage: translate('settings.messages.validate.firstname.required')
                                   },
                                   minLength: {
                                     value: 2,
                                     errorMessage: translate('settings.messages.validate.firstname.minlength')
                                   },
                                   maxLength: {
                                     value: 50,
                                     errorMessage: translate('settings.messages.validate.firstname.maxlength')
                                   }
                                 }}/>
                      </AvGroup>
                    </div>
                    <div className="pr-1 col-md-6">
                      <AvGroup>
                        <Label id="priceLabel" for="product-price">
                          <Translate contentKey="lustPrisionApp.product.price">Price</Translate>
                        </Label>
                        <AvField id="product-price" type="string" className="form-control" name="price"
                                 validate={{
                                   number: true,
                                   required: {
                                     value: true,
                                     errorMessage: translate('lustPrisionApp.product.validation.price.required')
                                   },
                                   minLength: {
                                     value: 1,
                                     errorMessage: translate('lustPrisionApp.product.validation.price.length')
                                   },
                                   maxLength: {
                                     value: 3,
                                     errorMessage: translate('lustPrisionApp.product.validation.price.length')
                                   },
                                   min: {value: 1},
                                   max: {value: 999}
                                 }}/>
                      </AvGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="pr-1 col-md-6">
                      <AvGroup>
                        <Label for="product-seler">
                          <Translate contentKey="lustPrisionApp.product.seler">Seller</Translate>
                        </Label>
                        <AvInput id="product-seller" type="select" className="form-control" name="seller.name">
                          <option value="" key="0" />
                          {sellers
                            ? sellers.map(otherEntity => (
                              <option value={otherEntity.name} key={otherEntity.name}>
                                {otherEntity.name}
                              </option>
                            ))
                            : null}
                        </AvInput>
                      </AvGroup>
                    </div>
                    <div className="pr-1 col-md-6">
                      <AvGroup>
                        <Label id="quantyInStockLabel" for="product-quantyInStock">
                          <Translate contentKey="lustPrisionApp.product.quantyInStock">Quanty In Stock</Translate>
                        </Label>
                        <AvField id="product-quantyInStock" type="string" className="form-control"
                                 name="quantyInStock" validate={{

                          required: {
                            value: true,
                            errorMessage: translate('lustPrisionApp.product.validation.stock.required')
                          },
                          minLength: {
                            value: 1,
                            errorMessage: translate('lustPrisionApp.product.validation.stock.minLength')
                          },
                          maxLength: {
                            value: 3,
                            errorMessage: translate('lustPrisionApp.product.validation.stock.maxLength')
                          },
                          min: {value: 0},
                          max: {value: 999}
                        }}/>
                      </AvGroup>
                    </div>
                  </div>
                  <AvGroup>
                    <Label id="descriptionProdLabel" for="product-descriptionProd">
                      <Translate contentKey="lustPrisionApp.product.descriptionProd">Description Prod</Translate>
                    </Label>
                    <AvField id="product-descriptionProd" type="text" name="descriptionProd"
                             validate={{
                               required: {
                                 value: true,
                                 errorMessage: translate('lustPrisionApp.product.validation.description.required')
                               },
                               maxLength: {
                                 value: 255,
                                 errorMessage: translate('lustPrisionApp.product.validation.description.length')
                               }
                             }}/>
                  </AvGroup>
                  <AvInput type="hidden" name="image" value={image}/>
                  <AvGroup>
                    <RButton tag={Link} id="cancel-save" onClick={handleClose} replace color="info">
                      <FontAwesomeIcon icon="arrow-left"/>
                      &nbsp;
                      <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
                    </RButton>
                    &nbsp;
                    <RButton color="primary" id="save-entity" type="submit" disabled={updating}>
                      <FontAwesomeIcon icon="save"/>
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                    </RButton>
                    <RButton color="secondary" id="delete-entity" style={{float: 'right'}} onClick={deleteProduct} disabled={updating}>
                      <FontAwesomeIcon icon="trash"/>
                      &nbsp;
                      <Translate contentKey="entity.action.delete">Delete</Translate>
                    </RButton>
                  </AvGroup>
                </AvForm>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
        <div>
          <hr></hr>
          <Row className="justify-content-center">
            <Col md={colN}>
              <Card className="card-user justify-content-center">
                <MaterialTable
                  title="Ultimas Vendas"
                  icons={TableIcon}
                  columns={state.columns}
                  data={productSales}
                  options={{
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF',
                      fontWeight: 'bold'
                    },
                    actionsColumnIndex: -1,
                    exportButton: true
                  }}
                  localization={{
                    body: {
                      emptyDataSourceMessage: "Não existem compras deste produto",
                    }
                  }}
                />
              </Card>
            </Col>
            <Col md={colN}>
              <Card className="card-stats">
                <CardHeader>
                  <CardTitle tag="h5">Vendas dos ultimos 6 meses</CardTitle>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      scales: {yAxes: [{ticks: {stepSize: 1}}]}
                    }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      <ProductLogs  open={open} productID={productEntity.id} onClose={handleDialogClose}/>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  sellers: state.seller.entities,
  productEntity: state.product.product,
  productSales: state.product.productSales,
  loading: state.product.loading,
  updating: state.product.updating,
  updateSuccess: state.product.updateSuccess,
  chartSales: state.statistics.chartProductSales,
  isAdmin: hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getEntity,
  getSellers,
  getProductSales,
  updateEntity,
  setBlob,
  deleteEntity,
  getChartProductSales
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
