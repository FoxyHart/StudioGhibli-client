import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Container, Button, Navbar } from 'react-bootstrap';



import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    /* Send a request to the server for authentication */
    axios.post('https://studioghiblidb.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch((e) => {
      console.log('User not found')
    });
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
        <Form.Control type="text" placeholder="Please enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Please enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      </Form>
      <Container>
      <Button variant="success" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      </Container>
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