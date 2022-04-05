import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Container, Button, Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './registration-view.scss'

export function RegistrationView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  const [ Email, setEmail] = useState('');
  const [ Birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post(`https://studioghiblidb.herokuapp.com/users`, {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
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

}
return (
  <Container className=" justify-content-center">
    <Row>
    <Col>
    <Card>
      <Card.Body>
        <Card.Title className="register-title">
          Sign up for your own Studio Ghibli account:
        </Card.Title>
   <Form>
     <Form.Group>
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={Username} placeholder="Enter a username" onChange={e => setUsername(e.target.value)} required />
    </Form.Group>
    <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control input type="password" value={Password}  placeholder="Your password must be 8 or more characters" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" value={Email} placeholder="Enter an email address" onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
      <Form.Label>Birthday:</Form.Label>
      <Form.Control type="birthday" value={Birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button variant="success" type="submit" onClick={handleSubmit}>Register</Button>
    </Form>
    <Card.Footer>
        Already have an account?{'    '}
        <Link to={`/`}>
          <Button variant="link">Login!</Button>
        </Link>
      </Card.Footer>
    </Card.Body>
    </Card>
    </Col>
    </Row>
    </Container>
)
  }
RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }),
  onRegistration: PropTypes.func,
}