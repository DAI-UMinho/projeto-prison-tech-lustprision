import './footer-dashboard.css'
import React from "react";
import {Container, Row} from "reactstrap";

const Footer = () => {
  return (
    <footer
      className="footer footer-default"
    >
      <Container fluid={true}>
        <Row>
          <div className="credits ml-auto">
            <div className="copyright">
              &copy; {new Date().getFullYear()}, made with{" Love "}
              by LustPrision
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
