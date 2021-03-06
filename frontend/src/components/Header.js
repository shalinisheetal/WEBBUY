import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Route } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        className="bg-color font-color px-0 py-0"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          {/* LinkContainer serve purpose of Link but from bootstrap */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                src="/./images/logo.jpg"
                width="240"
                height="75"
                className="d-inline-block align-top"
                alt="WebBuy logo"
                style={{ marginRight: "5px" }}
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <strong className="font-color">
                    <i className="fas fa-shopping-cart"> </i> My Cart
                  </strong>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"> </i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Admin"} id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
