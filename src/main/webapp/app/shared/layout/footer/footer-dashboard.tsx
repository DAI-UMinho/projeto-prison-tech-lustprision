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
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="https://www.creative-tim.com" target="_blank">
                  Creative Tim
                </a>
              </li>
              <li>
                <a href="https://blog.creative-tim.com" target="_blank">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/license"
                  target="_blank"
                >
                  Licenses
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <div className="copyright">
              &copy; {1900 + new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart"/> by LustPrision
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
