
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,Dropdown,DropdownToggle,DropdownMenu,
       DropdownItem,Container,InputGroup,InputGroupText,InputGroupAddon,Input} from "reactstrap"
import routes, {adminRoutes} from "app/shared/layout/sidebar/routes";
import {Button} from "@material-ui/core";
import {IRootState} from "app/shared/reducers";
import {getSession, } from "app/shared/reducers/authentication";

export interface IUserHeader extends StateProps, DispatchProps {
}

const Header = (props: IUserHeader) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [color, setColor] = useState("transparent");

  const [open, setOpen] = React.useState(false);

  const { account, isAuthenticated } = props;

  useEffect(() => {
    props.getSession();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = (exit?: boolean) => {
    setOpen(false);
    if(exit){ window.location.replace('/logout'); }
  };

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
    let brandName = "";
    routes.map((prop, key) => {
      if (window.location.href.includes(prop.layout + prop.path)) {
        brandName = prop.name;
      }
      return null;
    });

    adminRoutes.map((prop, key) => {
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
  {/*              <Dropdown nav isOpen={dropdownOpen} toggle={e => dropdownToggle(e)}>
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
                </Dropdown>*/}
                {account && isAuthenticated ? (<NavItem style={{marginTop: '6px'}} onClick={() => window.location.replace('dashboard/profile')}>
                  <img src={`data:${account.profileImageContentType};base64,${account.profileImage}`}
                       style={{width: 32, borderRadius: '50%', float: 'left', marginRight: 10}}/>
                  <p style={{marginTop: '3px'}}>{`${account.firstName} ${account.lastName}`}</p>
                </NavItem>) : null}
                <NavItem>
                  <Link onClick={handleClickOpen} className="nav-link btn-magnify">
                    <ExitToAppIcon />
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
            <Dialog
              open={open}
              onClose={handleLogout}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Quer fazer Logout?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  A sua sessão irá ser terminada
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleLogout(false)} color="primary">
                  Cancelar
                </Button>
                <Button onClick={() => handleLogout(true)} color="primary" autoFocus>
                  Sair
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Navbar>
  );
};

const mapStateToProps = ({authentication}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {getSession};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
