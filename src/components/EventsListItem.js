import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, List, Segment, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

const EventsListItem = ({ event }) => {

    return (
      <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                      <Item.Content>
                            <Item.Header as="a">{ event.title}</Item.Header>
                        <Item.Description>
                            Hosted by <Link to={`/profile/${event.hostUid}`} style={{color: 'black'}}>{event.hostedBy}</Link>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
                <Segment>
                  <span>
                    <Icon name="clock" /> {moment(event.date).format("ddd, MMMM Do YYYY, h:mm:ss a")} |
                    <Icon name="marker" /> {event.venue}
                  </span>
                </Segment>
                <Segment secondary>
                  <List horizontal>
                    {event.attendees && event.attendees.map((attendee) => {
                        return <List.Item as={Link} to={`/profile/${attendee.attendeeId}`} key={attendee.attendeeId}>
                            <Image size='mini' circular src={attendee.photoURL} />
                        </List.Item>
                    })}
                  </List>
                </Segment>
                <Segment clearing>
                  <p>{event.description}</p>
                  <Button as={Link} to={`/events/${event.id}`} color="teal" floated="right" content="View" />
                  {event.cancelled && (
                                <Label  style={{bottom: '30px'}} ribbon='right' color='red'
                                    content='This event has been cancelled'/>
                              )}
                </Segment>
              </Segment.Group>
    )
}

export default EventsListItem;
