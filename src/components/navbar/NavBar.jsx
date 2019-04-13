import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './navbar.scss';
export default function({ loggedUser, setLoggedUser }) {
  const logOut = () => {
    sessionStorage.removeItem('sessionUser');
    setLoggedUser(false);
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="navbar_cstm border border-gray"
      fixed="top"
    >
      <Navbar.Brand href="#home" className="text-dark">
        DONE
      </Navbar.Brand>

      {loggedUser && (
        <React.Fragment>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="bg-secondary"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
              <Link to="/home" className="text-dark">
                Home
              </Link>
              <Link to="/albums" className="text-dark">
                Album
              </Link>
              <Nav.Link eventKey={4} href="#memes" className="text-dark">
                <FaSearch />
              </Nav.Link>
              <Link
                to="/login"
                onClick={() => {
                  logOut();
                }}
                className="text-dark"
              >
                <FaSignOutAlt
                  style={{
                    fontSize: '21px',
                    marginRight: '5px',
                    marginBottom: '-15px'
                  }}
                />
              </Link>
            </Nav>
          </Navbar.Collapse>
        </React.Fragment>
      )}
    </Navbar>
  );
}
