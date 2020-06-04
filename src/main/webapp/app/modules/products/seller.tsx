import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Card, CardBody, CardTitle} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import MaterialTable, {Column} from 'material-table';

import {useTheme} from '@material-ui/core/styles';
import {Ellipsis} from 'react-spinners-css';
import {useMediaQuery} from "@material-ui/core";
import {getSellers, createEntity, updateEntity, deleteEntity} from "app/modules/products/seller.reducer";
import CardNewButton from "app/components/CardNewButton";
import TableIcon from "app/shared/util/table-icon";
import SellerUpdate from "app/modules/products/seller-update";

export interface IQuizProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

interface TableState {
questions: Array<Column<any>>;
}

export const Seller = (props: IQuizProps) => {
  const theme = useTheme();
  const mCol = useMediaQuery(theme.breakpoints.up('xl')) ? 6 : 10;
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  const [open, setOpen] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [selQuestion, setSelQuestion] = React.useState<any>(1);

  const [state, setState] = React.useState<TableState>({
    questions: [
      {title: 'ID Vendedor', field:'id'},
      {title: 'Nome', field: 'name'},
    ]
  });

  const {sellers, match, loading, updateSuccess} = props;

  const handleDialogClose = (value: string) => {
    setOpen(false);
  };

  const questionClick = (id?: number) => {
    if(id){
      setSelQuestion(id)
    }else{
      setSelQuestion(undefined);
    }
    setOpen(true);
  };

  const deleteSeller = id => {
    props.deleteEntity(id);
  };

  useEffect(() => {
    props.getSellers();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [updateSuccess]);

  useEffect(() => {
    {
      sellers && sellers.length > 0 ? setQuestionList([...sellers]) : console.log("NO")
    }
  }, [sellers]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col lg={mStatCol} md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-bulb-63 text-warning"/>
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Nº Vendedores</p>
                    {loading ? (<Ellipsis color="#99c3ff" size={40}/> )
                      : (<CardTitle tag="p">{sellers.length}</CardTitle>)}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <CardNewButton cardClick={() => questionClick()} cardTitle={"Vendedor"}/>
      </Row>
      <Row className="justify-content-center">
        <Col md={mCol}>
          <Card className="card-user">
            <MaterialTable
              title="Vendedores"
              icons={TableIcon}
              columns={state.questions}
              data={questionList}
              isLoading={loading}
              options={{
                headerStyle: {
                  fontWeight: 'bold'
                },
                actionsColumnIndex: -1
              }}
              actions={[
                {
                  icon: () => <TableIcon.Delete/>,
                  tooltip: 'Eliminar vendedor',
                  onClick: (event, rowData) => deleteSeller(rowData.id),
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
      <SellerUpdate open={open} onClose={handleDialogClose} seller={selQuestion}/>
    </div>
  );
};

  const mapStateToProps = ({seller}: IRootState) => ({
    sellers: seller.entities,
    loading: seller.loading,
    updateSuccess: seller.updateSuccess
});

const mapDispatchToProps = {getSellers, createEntity, updateEntity, deleteEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Seller);
