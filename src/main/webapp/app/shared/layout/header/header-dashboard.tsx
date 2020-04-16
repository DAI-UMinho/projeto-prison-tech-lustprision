
import React, {useState} from "react";
import {Link} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,Dropdown,DropdownToggle,DropdownMenu,
       DropdownItem,Container,InputGroup,InputGroupText,InputGroupAddon,Input} from "reactstrap"
import routes from "app/shared/layout/sidebar/routes";


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [color, setColor] = useState("transparent");

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const dropdownToggle = (e) => {
    setDropDownOpen(!dropdownOpen);
  };

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.includes(prop.layout + prop.path)) {
        brandName = prop.name;
      }
      return null;
    });

    return brandName;
  };

  /*
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  }*/
  /*componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }*/

  return (
        <Navbar
          color={color}
          expand="lg"
          fixed="top"
          className={"jh-navbar " +
          "navbar-absolute fixed-top" + " " +
          (color === "transparent" ? "navbar-transparent " : "")
          }
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div className="navbar-toggle">
                <button
                  type="button"
                  /*              ref={this.sidebarToggle}*/
                  className="navbar-toggler"
                  /* onClick={() => this.openSidebar()}*/
                >
                  <span className="navbar-toggler-bar bar1"/>
                  <span className="navbar-toggler-bar bar2"/>
                  <span className="navbar-toggler-bar bar3"/>
                </button>
              </div>
              <NavbarBrand href="/">{getBrand()}</NavbarBrand>
            </div>
            <NavbarToggler onClick={toggle}>
              <span className="navbar-toggler-bar navbar-kebab"/>
              <span className="navbar-toggler-bar navbar-kebab"/>
              <span className="navbar-toggler-bar navbar-kebab"/>
            </NavbarToggler>
            <Collapse
              isOpen={isOpen}
              navbar
              className="justify-content-end"
            >

              <Nav navbar>
                <Dropdown
                  nav
                  isOpen={dropdownOpen}
                  toggle={e => dropdownToggle(e)}
                >
                  <DropdownToggle caret nav>
                    <i className="nc-icon nc-bell-55"/>
                    <p>
                      <span className="d-lg-none d-md-block">Some Actions</span>
                    </p>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag="a">Action</DropdownItem>
                    <DropdownItem tag="a">Another Action</DropdownItem>
                    <DropdownItem tag="a">Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <NavItem>
                  <Link to="/logout" className="nav-link btn-magnify">
                    <ExitToAppIcon />
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
  );
};

export default Header;
