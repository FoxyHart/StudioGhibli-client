import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Navbar, Container, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';

import './registration-view.scss'

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail] = useState('');
  const [ birthday, setBirthday] = useState('');
 
 // Declare hook for each input
 const [ usernameErr, setUsernameErr ] = useState('');
 const [ passwordErr, setPasswordErr ] = useState('');
 const [ emailErr, setEmailErr ] = useState('');

 // validate user inputs
 const validate = () => {
  let isReq = true;

  if(!username){
      setUsernameErr('Username required');
      isReq = false;
  }else if(username.length < 2){
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
  }
  if(!password){
      setPasswordErr('Password required');
      isReq = false;
  }else if(password.length < 6){
      setPassword('Password must be at least 6 characters long');
      isReq = false;
  }
  if(!email){
      setEmailErr('Email required');
      isReq = false;
  }else if(email.indexOf('@') === -1){
      setEmail('Email must be valid');
      isReq = false;
  }

  return isReq;
}
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) { 
      axios
    .post(`https://studioghiblidb.herokuapp.com/users`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      alert('Registration Successful!');
      window.open('/', '_self');
    })
    .catch(function (error) {
      console.log('error registering');
    });
};
}
return (
  <Container>
    <Row>
    <Col>
   <Form>
     <Form.Group>
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} placeholder="Enter a username" onChange={e => setUsername(e.target.value)} required />
    </Form.Group>
    <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control input type="password" value={password}  placeholder="Your password must be 8 or more characters" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" value={email} placeholder="Enter an email address" onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
      <Form.Label>Birthday:</Form.Label>
      <Form.Control type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
    </Col>
    </Row>
    </Container>
);
  };
RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }),
  onRegistration: PropTypes.func,
}