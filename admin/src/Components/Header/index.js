import React from "react";
import { Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/authAction";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const renderSignIn = () => {
    if (auth.authenticate) {
      return (
        <>
          <li>
            <div className="search-in-header">
              <input type="text" />
            </div>
            {/* search-in-header */}
          </li>
          <li className="nav-item">
            <span onClick={() => {
              dispatch(logout());
            }} style={{ cursor: "pointer" }} className="nav-link">
              <i className="fas fa-sign-out-alt"></i>
            logout
          </span>
          </li>
        </>
      );
    } else {
      return (
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            <i className="fas fa-sign-in-alt"></i>
            signin
          </NavLink>
        </li>
      );
    }
  };

  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Link className="navbar-brand" to="/">
          <img src="./images/shoes.png" className="icon-shoes" alt="shoes" />
          Admin Shoes
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            {
              renderSignIn()
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
