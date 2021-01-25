import React from 'react'
import { Link } from 'react-router-dom';
import { Item, Label, Segment } from 'semantic-ui-react';

const EventDetailsSidebar = ({attendees}) => {
    return (
            <>
              <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
              >
                {attendees && attendees.length && attendees.length > 1 ? 'People' : 'Person'} Going
              </Segment>
              <Segment attached>
                 <Item.Group relaxed divided>
                    {attendees && attendees.map((attendee) => (
                    <Item as={Link} to={`/profile/${attendee.id}`} key={attendee.id} style={{ position: 'relative' }}>
                    <Label style={{position: 'absolute'}} color='orange' ribbon='right' content='Host' />
              <Item.Image
                size='tiny'
                src={attendee.photoURL || '/assets/images/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{attendee.name}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
              </Segment>
            </>
    )
}

export default EventDetailsSidebar;
