import React from 'react';
import {makeStyles, Theme, createStyles, useTheme} from '@material-ui/core/styles';
import { Col, Row, Card, CardBody, CardTitle } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {Translate} from "react-jhipster";
import {useMediaQuery} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "#284a25"
    },
    title: {
      color: '#ffffff'
    }
  }),
);

interface CardButtonState{
  cardTitle: string,
  cardClick: (value?: any) => void;
}

const CardNewButton = (props: CardButtonState) => {
  const classes = useStyles();
  const { cardClick, cardTitle } = props;

  const theme = useTheme();
  const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;

  return (
    <Col lg={mStatCol} md="6" sm="6">
      <div className="card-hover" onClick={cardClick}>
        <Card className="card-new">
          <CardBody>
            <Row>
              <Col md="4" xs="5">
                <div className="icon-big text-center">
                  <FontAwesomeIcon className={classes.icon} icon={faPlusCircle}/>
                </div>
              </Col>
              <Col md="8" xs="7">
                <div className="numbers">
                  <CardTitle tag="p" className={classes.title}>
                    {/*<Translate contentKey="lustPrisionApp.product.home.newCard">{cardTitle}</Translate>*/}
                    {cardTitle}
                  </CardTitle>
                  <p/>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Col>
  );
};

export default CardNewButton;
