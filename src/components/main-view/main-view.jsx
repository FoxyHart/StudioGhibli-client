import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar/navbar';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view'
import { ProfileView } from '../profile-view/profile-view';

import {Row, Col, Container, Button, Image} from 'react-bootstrap/';


import './main-view.scss'

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      Description: null,
      Movies: null,
      user: null
    };
  }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://studioghiblidb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
// to log in
 onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
// to log out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  onRegistration(registration) {
    this.setState({
      registration,
    });
  }

setSelectedMovie(newSelectedMovie) {
  this.setState({
    selectedMovie: newSelectedMovie
  });
}


rendermovies = ({user, movies}) => {
  if (!user) return (
    <Col>
    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
    </Col>
  );
  return movies.map(m => (
   <Col md={3} key ={m._id}>
     <MovieCard movie={m} />
   </Col>
  ))
}


renderMovie = ({user, movies}) => {
  if (!user)
  return (
    <Col>
      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
    </Col>
  );
if (movies.length === 0) return <div className="main-view" />;
return <Col md={8}>
 <MovieView movie={movies.find(m => m._id === window.location.href.split("/movies/")[1])} onBackClick={() => history.goBack()} />
</Col>
}

renderGenre = ({ user, movies }) => {
  if (!user)
  return (
    <Col>
      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
    </Col>
  );
 return <Col md={8}>
    <GenreView Genre={movies.find(m => m.Genre.Name ===  window.location.href.split("/genres/")[1]).Genre} onBackClick={() => history.goBack()} />
 </Col>
}

  render() {
    const { movies, user } = this.state;

    if (!user) return <Row> 
      <Col>
      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        {/*<NavbarView />*/}
   <Routes> 
        {/* welcome */}
        <Route exact path="/" element={<this.rendermovies user={user} movies={movies} />} />
        <Route path="/login" element={<LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />} />
        {/* registration view*/}
        <Route path="/register" render={() =>{
          if (user) return <Redirect to="/register" />;
          return <Col lg={8} md={8}>
            <RegistrationView />
          </Col>
        }} />

        {/* For movie cards */}
        <Route path="/movies/:movieId" element={<this.renderMovie movies={movies} user={user} />} />

        {/* genre view*/}
        <Route exact path="/genre/:genre" render={<this.renderGenre movies={movies} user={user} />}/>

        {/* director view */}
        <Route exact path="/directors/:directorName" render={({ match, history }) => {
            if (!user)
            return (
              <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>
            );
          if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
             <DirectorView Director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
           </Col>
        }}/>

        {/*user profile view*/}
        <Route
              path="/users/:Username"
              render={({ match, history }) => {
                if (!user)
                return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              if (movies.length === 0) return <div className="main-view" />;
                <ProfileView movies={movies} user={user}  history={history}  users={users} onBackClick={() => history.goBack()} />
        }} />
       {/* <Route path={`/user-update/${user}`}
        render = {({match,history}) => {
          if (!user) return <Redirect to="/" />
          return <Col>
          <UserUpdate user={user} onBackClick={() => history.goBack()} />
          </Col>
        }} /> */}
    </Routes>  
    </Router>  
    );
   }
  } 

export default MainView;