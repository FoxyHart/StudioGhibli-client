import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  componentDidMount(){
    axios.get('https://studioghiblidb.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
onRegistration(registration) {
  this.setState({
    registration,
  })
}

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, registration } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!registration) return <RegistrationView onRegistration={registration => this.onRegistration(registration)} />

    if (movies.length === 0) return <div className="main-view" />;
    
    return (
   <Container> 
    <Navbar expand="xxlg" bg="dark" variant="dark" className= "justify-content-md-center">
      <Container>
        <Navbar.Brand>  Studio Ghibli </Navbar.Brand>
      </Container>
      </Navbar>
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
        }
      </Row>
    </Container>    
    );
   }
  } 

export default MainView;