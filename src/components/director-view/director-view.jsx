import React from 'react';
import PropTypes from 'prop-types';

// Import React Bootstrap Components
import { Button, Container, Card } from 'react-bootstrap/';

// Import custom SCSS
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { Director, onBackClick, movies, movie } = this.props;

    return (
      <Container>
        <Card className="director-card">
        <Card.Header>Director</Card.Header>
          <Card.Body>
            <Card.Title className="director-card-title"> {Director.Name}</Card.Title>
            <Card.Text className="director-card-text">Birth: {Director.Birth}</Card.Text>
            <Card.Text className="director-card-text">Death: {Director.Death}</Card.Text>
            <Card.Text className="director-card-text"> {Director.Bio}</Card.Text>
            <Card.Footer className="director-card-footer">
              <Button onClick={() => {
                  onBackClick(null);
                }}> Back </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
    Death: PropTypes.number,
  }).isRequired,
};