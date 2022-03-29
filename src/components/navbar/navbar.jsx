import React from 'react';
import { Link } from 'react-router-dom';

// React Bootstrap Components
import { Navbar, Nav, Form, Button, Container, Row, Col, Card, Stack } from 'react-bootstrap/';

// Custom SCSS
import '../navbar/navbar';

export function NavbarView() {
  const user = localStorage.getItem('user');

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  return (
    <Navbar bg="dark" variant="light" expand="md">
      <Container>
        <Link to={`/`}>
          <Navbar.Brand>
            <img
              alt="Logo of Totoro"
              src={require('../../img/logo.jpg')}
              width="100"
              height="auto"
            />{' '}
          </Navbar.Brand>
        </Link>
        <Button type="button" onClick={() => this.onLoggedOut()}>
          Logout
        </Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href={`/users/${user}`}>My Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
