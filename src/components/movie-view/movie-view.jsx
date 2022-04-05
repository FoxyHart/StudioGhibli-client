import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import "../movie-view/movie-view.scss"

import { Card, Col, Container, Row, Button} from "react-bootstrap";

import { Link } from 'react-router-dom';



export class MovieView extends React.Component {

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios
      .post(
        `https://studioghiblidb.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'POST',
        }
      )
      .then((response) => {
        alert(`Added ${this.props.movie.Title} to your favorites!`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <Card className="movie-view">
              <Card.Body>
              <Card.Img className="movie-poster" src={movie.ImagePath} />
              <Card.Title className="movie-title">{movie.Title}</Card.Title>
              <Card.Text className="movie-description">{movie.Description}</Card.Text> 
              <Card.Text className="movie-director"> Director: {movie.Director.Name}</Card.Text>
              <Card.Text className="movie-genre"> Genre: {movie.Genre.Name}</Card.Text>
              </Card.Body>
            </Card> 
             <Link to={`/directors/${movie.Director.Name}`}>
               <Button variant="link">Director</Button>
             </Link>
             <Link to={`/genre/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
             </Link>
             <Button onClick={() => {  window.location.replace("/") }}>Return to Movies</Button>
             <Button variant="outline-primary" className="btn-outline-primary" value={movie._id}
                onClick={(e) => this.addFavoriteMovie(e, movie)}>
                Add to Favorites </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.proptypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  
};

