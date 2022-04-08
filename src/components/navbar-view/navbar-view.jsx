import React from 'react';
import { Link } from 'react-router-dom';

// React Bootstrap Components
import { Navbar, Nav, Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap/';


export function NavbarView() {
const user = localStorage.getItem('user');

const onLoggedOut = () => {
  localStorage.clear();
  window.open('/', '_self');
};

  return (
    <Navbar bg="dark" variant="dark" expand="xxlg" 
        className="justify-content-lg-center">
          <Container>
        <Link to={`/`}>
          <Navbar.Brand>
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg6fShgzml6wxIOsQ98WXGrJMfBeIbcGlo3A&usqp=CAU"
          alt="Image of Totoro from My Neighbor Totoro"
          width="90"
          height="90"
        />{' '}Studio Ghibli</Navbar.Brand>
        </Link>
          <Nav className="ml-auto">
            <Nav.Link href={`/users/${user}`}>My Profile</Nav.Link>
          </Nav>
          <Button type="button" variant="danger" onClick={() => { onLoggedOut()}}>
          Logout</Button>
          </Container>
       </Navbar>
  );
}


      