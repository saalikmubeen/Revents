import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment, Image } from 'semantic-ui-react';

const HomePage = ({ history }) => {
  
    return (
                <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                  <Header as='h1' inverted>
                    <Image
                      size='massive'
                      src='/assets/images/logo.png'
                      alt='logo'
                      style={{ marginBottom: 12 }}
                    />
                    Re-Vents
                  </Header>
                  <Button as={Link} to="/events" size="large" inverted>
                    Get started
                    <Icon name='right arrow' inverted />
                  </Button>
                </Container>
              </Segment>
    )
}

export default HomePage;
