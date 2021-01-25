import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, List, Segment, Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../actions/eventsActions';

const EventsListItem = ({ event }) => {
  const dispatch = useDispatch();

    return (
      <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                      <Item.Content>
                            <Item.Header as="a">{ event.title}</Item.Header>
                        <Item.Description>
                            {event.hostedBy}
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
                <Segment>
                  <span>
                    <Icon name="clock" /> {event.date.toString()} |
                    <Icon name="marker" /> {event.venue}
                  </span>
                </Segment>
                <Segment secondary>
                  <List horizontal>
                    {event.attendees && event.attendees.map((attendee) => {
                        return <List.Item as={Link} to={`/profile/${attendee.id}`} key={attendee.id}>
                            <Image size='mini' circular src={attendee.photoURL} />
                        </List.Item>
                    })}
                  </List>
                </Segment>
                <Segment clearing>
                  <p>{event.description}</p>
                  <Button as={Link} to={`/events/${event.id}`} color="teal" floated="right" content="View" />
                  <Button color="red" floated="right" content="Delete" onClick={() => dispatch(deleteEvent(event.id))} />
                </Segment>
              </Segment.Group>
    )
}

export default EventsListItem;
