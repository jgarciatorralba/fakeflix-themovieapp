import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown } from "react-bootstrap";

import Logo from "../../components/Logo/Logo";

import "./Header.scss";

function Header({ isLoggingOut, currentUser, defaultAvatar, logout }) {
  const [avatar, setAvatar] = useState(currentUser.avatar);

  useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  return (
    <div className="Header">
      <Navbar sticky="top" bg="black" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <Logo fontSize="1.5rem" />
        </Navbar.Brand>
        <img
          className="rounded ml-auto mr-1"
          src={avatar}
          alt="Profile"
          onError={() => setAvatar(defaultAvatar)}
        />
        <NavDropdown href="" title="" id="basic-nav-dropdown">
          <NavDropdown.Item className="username">
            {currentUser.username}
          </NavDropdown.Item>
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Item href="/search">Search</NavDropdown.Item>
          <NavDropdown.Item onClick={logout} disabled={isLoggingOut} href="">
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </div>
  );
}

export default Header;
