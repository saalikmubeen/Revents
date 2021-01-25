import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';


const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};


const EventDetailsHeader = ({event}) => {
    return (
           <Segment.Group>
              <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src="/assets/categoryImages/drinks.jpg" fluid style={eventImageStyle}/>
        
                <Segment basic  style={eventImageTextStyle}>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size="huge"
                          content={event.title}
                          style={{ color: 'white' }}
                        />
                        <p>{event.date}</p>
                        <p>
                            Hosted by <strong>{event.hostedBy}</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
        
              <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>
        
                <Button color="orange" floated="right">
                  Manage Event
                </Button>
              </Segment>
            </Segment.Group>
    )
}

export default EventDetailsHeader;
