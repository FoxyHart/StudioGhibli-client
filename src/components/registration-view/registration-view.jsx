import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Navbar, Container, Button, Row, Col} from 'react-bootstrap'
import './registration-view.scss'

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail] = useState('');
  const [ birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
};

return(
  <Container>
    <Row>
    <Col>
    <Navbar expand="xxlg" bg="dark" variant="dark" className= "justify-content-md-center">
      <Container>
        <Navbar.Brand> Studio Ghibli </Navbar.Brand>
      </Container>
      </Navbar>
   <Form>
     <Form.Group>
      <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required />
    </Form.Group>
    <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
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
}
RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }),
  onRegistration: PropTypes.func.isRequired,
};