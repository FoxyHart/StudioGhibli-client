import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";



export class MovieCard extends React.Component {
render () {
  const { movie } = this.props;

  return (
    <Card className="main-view-card">
        <Card.Header>
        <Card.Title>{movie.Title}</Card.Title>
        </Card.Header>
      <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Footer>
        <Link to={`/movies/${movie._id}`}>
        <Button className="btn_learn">Learn more</Button>
        </Link>
        </Card.Footer>
    </Card>
  )
}
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    })
  }).isRequired
};