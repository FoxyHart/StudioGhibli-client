
import React from 'react';
import axios from 'axios';


import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap/';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount(){
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onRemoveFavorite = (e, movie) => {
    const username = localStorage.getItem('user');
    console.log(username);
    const token = localStorage.getItem('token');
    console.log(this.props);
    axios.delete(`https://studioghiblidb.herokuapp.com/users/${Username}/movies/%{movie._id}`,
    { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);
      alert('${movie.Title} has been removed from Favorites.');
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
  });
  window.open('/', '_self');
}

getUser = (token) => {
  const Username = localStorage.getItem('user');
  axios.get(`https://studioghiblidb.herokuapp.com/users/${Username}`, {
    headers: {Authorization: `Bearer ${token}` },
  })
  .then((response) => {
    this.setState({
      Username: response.data.Username,
      Password: response.data.Password,
      Email: response.data.Email,
      Birthday: response.data.Birthday,
      FavoriteMovies: response.data.FavoriteMovies,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
};

editUser = (e) => {
  e.preventDefault();
  const Username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  axios.put(`https://studioghiblidb.herokuapp.com/users/${Username}`,
   {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday,
    },
    {
    headers: {Authorization: `Bearer ${token}` },
  })
  .then ((response) => {
    this.setState({
      Username: response.data.Username,
      Password: response.data.Password,
      Email: response.data.Email,
      Birthday: response.data.Birthday,
    });

    localStorage.setItem('user', this.state.Username);
    const data = response.data;
    console.log(data);
    console.log(this.setState.Username);
    alert('Profile has been updated!');
    window.open(`.users/${Username}`, '_self');
  })
  .catch(function (error) {
    console.log(error);
  });
};

//unregister
onDeleteUser() {
const Username = localStorage.getItem('user');
const token = localStorage.getItem('token');

axios.delete(`https://studioghiblidb.herokuapp.com/users/${Username}`, {
  headers: {Authorization: `Bearer ${token}` },
})
.then((response) => {
  console.log(response);
  alert('Profile has been deleted!');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.open('/','_self');
})
.catch(function (error) {
 console.log(error);
});
}

//set user values
setUsername(value) {
  this.setState({
    Username: value,
  });
  this.Username = value;
}

setPassword(value) {
  this.setState ({
    Password: value,
  });
  this.Password = value;
}

setEmail(value) {
  this.setState({
    Email: value,
  });
  this.Email = value;
}

setBirthday(value) {
  this.setState({
    Birthday: value,
  });
  this.Birthday = value;
}

render() {
  const { movies } = this.props;
  const { FavoriteMovies, Username, Email, Birthday } = this.state;

  return (
    <Container className="profile-view">
      <Row>
        <Col>
          <Card className="user-profile">
            <Card.Header><h3>User Profile</h3></Card.Header>
            <Card.Body>
                <h4 className="label">Username: </h4>
                <p className="value">{Username}</p>
                <h4 className="label">Email:</h4>
                <p className="value">{Email}</p>
                <h4 className="label">Birthday:</h4>
                <p className="value">{Birthday}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header><h3>Update Profile</h3></Card.Header>
            <Card.Body>
                <Form
                  className="update-form"
                  onSubmit={(e) =>
                    this.editUser(e)
                  }
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="New Email"
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button
                      variant="warning"
                      type="submit"
                      onClick={() => this.editUser()}
                    >
                      Update User
                    </Button>
                    <Button
                      className="delete-button"
                      variant="danger"
                      onClick={() => this.onDeleteUser()}
                    >
                      Delete User
                    </Button>
                  </Form.Group>
                </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="user-favorites justify-content-center">
            <Card>
            <Card.Header className="user-favorites-header">
                <h2>My Favorite Movies</h2>
              </Card.Header>
              <Card.Body>
                {FavoriteMovies.length === 0 && (
                  <Container className="text-center">No Favorite Movies</Container>
                )}
                <Row className="favorite-container justify-content-center">
                  {FavoriteMovies.length > 0 &&
                    movies.map((movie) => {
                      if (
                        movie._id ===
                        FavoriteMovies.find((fav) => fav === movie._id)
                      ) {
                        return (
                          <Card
                            className="favorite-movie card-content"
                            key={movie._id}
                          >
                            <Card.Img
                              className="fav-poster justify-content-center"
                              variant="top"
                              src={movie.ImagePath}
                            />
                            <Card.Body>
                              <Card.Title className="movie_title">
                                {movie.Title}
                              </Card.Title>
                              <Button
                                size="sm"
                                variant="danger"
                                value={movie._id}
                                onClick={(e) =>
                                  this.onRemoveFavorite(e, movie)}>Remove</Button>
                            </Card.Body>
                          </Card>
                        )
                      }
                    })}
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}
}