import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";

import Logo from "../../components/Logo/Logo";

import "./Header.scss";

function Header() {
  return (
    <div className="Header">
      <Navbar sticky="top" bg="black" variant="dark" expand="lg">
        <Navbar.Brand>
          <Logo fontSize="1.5rem" />
        </Navbar.Brand>
        <img
          className="border rounded ml-auto mr-1"
          src="http://localhost:5000/img/user/default.jpg"
          alt="Profile"
        />
        <NavDropdown title="" id="basic-nav-dropdown">
          <NavDropdown.Item className="username">jorgartor</NavDropdown.Item>
          <NavDropdown.Item href="">Profile</NavDropdown.Item>
          <NavDropdown.Item href="">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </div>
  );
}

export default Header;
