import React from 'react';
import PropTypes from 'prop-types';
import "../movie-view/movie-view.scss"
import { Card, Col, Container, Row, Button, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';



export class MovieView extends React.Component {

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

