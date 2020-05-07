/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from 'react';
import {AiOutlineUser} from "react-icons/ai";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import {IPrisioner} from "app/shared/model/prisioner.model";

export const test = {labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct"
  ],
  datasets: [
    {
      borderColor: "#6bd098",
      backgroundColor: "#6bd098",
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 3,
      data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
    },
    {
      borderColor: "#f17e5d",
      backgroundColor: "#f17e5d",
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 3,
      data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
    },
    {
      borderColor: "#fcc468",
      backgroundColor: "#fcc468",
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 3,
      data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
    }
  ]};
const test2 = {
  labels: [1, 2, 3],
    datasets: [
    {
      label: "Emails",
      pointRadius: 0,
      pointHoverRadius: 0,
      backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
      borderWidth: 0,
      data: [342, 480, 530, 120]
    }
  ]
};
export const test3 = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  datasets: [
    {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: "#fbc658",
      backgroundColor: "transparent",
      pointBorderColor: "#fbc658",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    },
    {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: "#51CACF",
      backgroundColor: "transparent",
      pointBorderColor: "#51CACF",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    }]
}
const apiUrl = 'api/prisioners';
const apiUrlTrabalho = 'api/works';
const apiUrlProdutos = 'api/products';
const apiUrlVendas = 'api/purchases';

const HDashboard = (props) => {

  const [countainerPrisioneiros, setCount] = useState(0);
  useEffect(() => {
    const comp = axios.get(`${apiUrl}`);
    comp.then(result => setCount(result.data.length));
  },[]);

  const [countainerTrabalhos, setCount1] = useState(0);
  useEffect(() => {
    const comp1 = axios.get(`${apiUrlTrabalho}`);
    comp1.then(result => setCount1(result.data.length));
  },[]);

  const [countainerProdutos, setCount2] = useState(0);
  useEffect(() => {
    const comp2 = axios.get(`${apiUrlProdutos}`);
    comp2.then(result => {setCount2(result.data.length)
    //console.log(result) //ver (daniel)
      });
  },[]);

  const [countainerVendas, setCount3] = useState(0);
  useEffect(() => {
    const comp3 = axios.get(`${apiUrlVendas}`);
    comp3.then(result => {setCount3(result.data.length)
      //console.log(result) //ver (daniel)
    });
  },[]);

  return (
        <div>
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-user-run text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Presidiários no Estabelecimento:</p>
                        <CardTitle tag="p">{countainerPrisioneiros}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" />Numero de presidiários detidos neste establecimento prisional
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-badge text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Trabalhos disponiveis:</p>
                        <CardTitle tag="p">{countainerTrabalhos}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" />Quantidade de trabalhos para os presidiários realizarem
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-cart-simple text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Produtos na loja:</p>
                        <CardTitle tag="p">{countainerProdutos}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" />Quantidade de produtos disponiveis para venda
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bag-16 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Vendas:</p>
                        <CardTitle tag="p">{countainerVendas}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" />Total de produtos vendidos na loja virtual deste estabelecimento prisional
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={test}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={test2}
                    // options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{" "}
                    <i className="fa fa-circle text-warning" /> Read{" "}
                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                  <p className="card-category">Line Chart with Points</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={test3}

                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
    );
}

export default HDashboard;
