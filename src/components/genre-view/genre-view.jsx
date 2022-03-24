import React from 'react';
import PropTypes from 'prop-types';

// Import React Bootstrap Components
import { Button, Card, Container } from 'react-bootstrap/';

// Import custom SCSS
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick, movies } = this.props;

    return (
      <Container>
        <Card>
          <Card.Header>Genre</Card.Header>
          <Card.Body>
            <Card.Title>{Genre.Name}</Card.Title>
            <Card.Text>{Genre.Description}</Card.Text>
            <Card.Footer>
              <Button
                onClick={() => {
                  onBackClick(null);
                }}>Back</Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

GenreView.proptypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
