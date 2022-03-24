import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Container, Button, Navbar } from 'react-bootstrap';



import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
const validate = () => {
  let isReq = true;
  if(!username){
   setUsernameErr('Username Required');
   isReq = false;
  }else if(username.length < 2){
   setUsernameErr('Username must be 3 characters long');
   isReq = false;
  }
  if(!password){
   setPasswordErr('Password Required');
   isReq = false;
  }else if(password.length < 8){
   setPassword('Password must be 8 characters long');
   isReq = false;
  }

  return isReq;
}
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const isReq = validate();
  if(isReq) {
    /* Send a request to the server for authentication */
    axios.post('https://studioghiblidb.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
    .then((response) => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch((e) => {
      console.log('User not found')
    });
  }
  };
  
  return (
    <Container>
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Please enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        {/* code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Please enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      </Form>
      <Container>
      <Button variant="success" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      </Container>
    </Container>
  )
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
}   