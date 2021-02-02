import React from 'react'
import { Link } from 'react-router-dom';
import { Item, Label, Segment } from 'semantic-ui-react';

const EventDetailsSidebar = ({event}) => {
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
                {event.attendees && event.attendees.length}
                {event.attendees && event.attendees.length && event.attendees.length > 1 ? ' People' : ' Person'} Going
              </Segment>
              <Segment attached>
                  <Item.Group relaxed divided>
                    {event.attendees && event.attendees.map((attendee) => (
                    <Item as={Link} to={`/profile/${attendee.attendeeId}`} key={attendee.attendeeId} style={{ position: 'relative' }}>
                        {attendee.attendeeId === event.hostUid && 
                          <Label style={{ position: 'absolute' }} color='orange' ribbon='right' content='Host' />
                        }
              <Item.Image
                size='tiny'
                src={attendee.photoURL || '/assets/images/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{attendee.displayName}</span>
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
