import React from 'react';
import PropTypes from 'prop-types';

// Import React Bootstrap Components
import { Button, Container, Navbar, Card } from 'react-bootstrap/';

// Import custom SCSS
import './director-view.scss';

export class DirectorView extends React.Component {
  render() { 
    console.log(this.props)
    const {Director, movies} = this.props;
    return (
    <div>
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
                  window.location.replace("/")
                }}> Back </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    </div>);
  }
}
 
