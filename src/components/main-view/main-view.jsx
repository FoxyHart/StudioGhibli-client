import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//#0
import { setMovies } from '../../actions/actions';

import MoviesList from '../movie-list/movie-list'

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view'
import { NavbarView } from '../navbar-view/navbar-view';
import {Row, Col, Container, Button, Image, Navbar} from 'react-bootstrap/';


import './main-view.scss'

// #2 export removed from here
class MainView extends React.Component {

  constructor() {
    super();
    //#3 movies state removed from here
    this.state = {
      /*movies: [],
      selectedMovie: null,
      Description: null,
      Movies: null,*/
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
      // #4
      this.props.setMovies(response.data);
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
 <MovieView movie={movies.find(m => m._id === window.location.href.split("/movies/")[1])} />
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
    <GenreView Genre={movies.find(m => m.Genre.Name ===  window.location.href.split("/genre/")[1]).Genre} />
 </Col>
}

renderDirector = ({ user, movies }) => {
  let director = window.location.href.split("/directors/")[1].replace("%20", " ")
  if (!user)
  return (
    <Col>
      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
    </Col>
  );
 return <Col md={8}>
    <DirectorView Director={movies.find(m => m.Director.Name == director).Director} />
 </Col>
}

renderUser = ({ user, movies }) => {
  if (!user)
    return (
      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
    );
  if (movies.length === 0) return <div className="main-view" />;
    return (
      <Col md={8}>
        <ProfileView user={user} 
                    setUser={(user) => this.setUser(user)}
                    movies={movies}
                    onLoggedOut={() => this.onLoggedOut()}/>
      </Col>
    );
}

renderRegister = ({ user }) => {
          if (user) return <Navigate to="/" />;
          return( 
            <Col xs={12} md={8}>
            <RegistrationView />
            </Col>
          )};
//#5 movies is extracted from this.props rather than from the this.state
  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
    <Router>
      <NavbarView />
      <Container>
      <Row className="main-view justify-content-md-center">
      <Routes> 
        {/* welcome */}
        <Route exact path="/" element={<this.rendermovies user={user} movies={movies} />} />
        
        {/* login view*/}
        <Route path="/login" element={<LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />} />
        
        {/* registration view*/}
        <Route  path="/register" element={<this.renderRegister user={user} />} />

        {/* For movie cards */}
        <Route path="/movies/:movieId" element={<this.renderMovie movies={movies} user={user} />} />

        {/* genre view*/}
        <Route exact path="/genre/:genre" element={<this.renderGenre movies={movies} user={user} />}/>

        {/* director view */}
        <Route exact path="/directors/:director" element={<this.renderDirector movies={movies} user={user} />}/>

        {/*user profile view*/}
        <Route exact path="/users/:Username" element={<this.renderUser movies={movies} user={user} /> } />
    </Routes> 
    </Row> 
    </Container>
    </Router>  
    )
   }
  } 

// #7
let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

//#8
export default connect(mapStateToProps, { setMovies }) (MainView);