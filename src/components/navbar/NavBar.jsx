import React from 'react';

//Librerías externas
import { Navbar, Nav } from 'react-bootstrap';
import { FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

//Servicios
import { delSessionFromStorage } from '../../services/session';

//Estilos
import './navbar.scss';
export default function({ loggedUser, setLoggedUser }) {
  const logOut = async () => {
    await delSessionFromStorage();
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
      <Navbar.Brand href="#home">DONE</Navbar.Brand>

      {loggedUser && (
        <React.Fragment>
          <Nav className="mr-auto" />
          <Navbar id="responsive-navbar-nav">
            <Nav>
              <Link to="/home" className="item-nav">
                Home
              </Link>
              <Link to="/albums" className="item-nav">
                Album
              </Link>
              <Link to="/" className="text-dark">
                <FaSearch className="icon-navbar" />
              </Link>
              <Link
                to="/login"
                onClick={() => {
                  logOut();
                }}
                className="text-dark"
              >
                <FaSignOutAlt className="icon-navbar icon-logout" />
              </Link>
            </Nav>
          </Navbar>
        </React.Fragment>
      )}
    </Navbar>
  );
}
