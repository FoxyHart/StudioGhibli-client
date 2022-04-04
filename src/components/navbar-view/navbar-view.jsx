import React from 'react';
import { Link } from 'react-router-dom';

// React Bootstrap Components
import { Navbar, Nav, Form, Button, Container, Row, Col, Card, Stack } from 'react-bootstrap/';


export function NavbarView() {
const user = localStorage.getItem('user');

const onLoggedOut = () => {
  localStorage.clear();
  window.open('/', '_self');
};

  return (
    <Navbar bg="dark" variant="dark" expand="lg" 
        className="justify-content-md-center">
          <Container>
        <Link to={`/`}>
          <Navbar.Brand>Studio Ghibli</Navbar.Brand>
        </Link>
        <Button type="button" variant="danger" onClick={() => { onLoggedOut()}}>
          Logout</Button>
          <Nav className="ml-auto">
            <Nav.Link href={`/users/${user}`}>My Profile</Nav.Link>
          </Nav>
          </Container>
       </Navbar>
  );
}


      