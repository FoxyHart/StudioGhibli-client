import React from 'react';
import  { Navbar, Container, Nav, Button, Link } from 'react-bootstrap';

export function NavbarView({ onLoggedOut }) {
/* const onLoggedOut = () => {
  localStorage.clear();
  window.open("/", "_self");
}

 const isAuth = () => {
  if(typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else {
    return false;
  }
};
*/
return (

  <Navbar bg="dark" expand="lg" variant="dark">
    <Container>
      <Navbar.Brand className="navbar-logo" href="/"> Studio Ghibli </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" /> 
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link to={'/'}>
              <Button variant="link" onClick={() =>
              { this.onLoggedOut() }}>Logout</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
)
}