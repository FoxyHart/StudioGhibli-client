import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Container, Button, Navbar } from 'react-bootstrap';



import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };
  return (
    <Container>
      <Navbar expand="xxlg" bg="dark" variant="dark" className= "justify-content-md-center">
      <Container>
        <Navbar.Brand>  Studio Ghibli </Navbar.Brand>
      </Container>
      </Navbar>
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};   