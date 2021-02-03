import React from 'react'
import { Link } from 'react-router-dom';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { joinEvent, leaveEvent } from "../actions/eventsActions";
import { openModal } from '../actions/modalActions';


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



const EventDetailsHeader = ({ event }) => {
  const dispatch = useDispatch();
  const currentUserUID = useSelector((state) => state.firebase.auth.uid)

  const handleJoinEvent = () => {

    if (currentUserUID) {
        dispatch(joinEvent(event.id));
    } else {
        dispatch(openModal("UnAuthModal"));
    }
    
  }

  const handleLeaveEvent = () => {
    dispatch(leaveEvent(event.id));
  }

  const isAlreadyRegistered = event.attendees.some((attendee) => attendee.attendeeId === currentUserUID)


    return (
           <Segment.Group>
              <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle}/>
        
                <Segment basic  style={eventImageTextStyle}>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size="huge"
                          content={event.title}
                          style={{ color: 'white' }}
                        />
                        <p>{moment(event.date).format("dddd Do MMMM ")}</p>
                        <p>
                            Hosted by <strong>{event.hostedBy}</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
        
              <Segment attached="bottom">
              {isAlreadyRegistered ?
                  <Button onClick={handleLeaveEvent}>Cancel My Place</Button> :
                  <Button color="teal" onClick={handleJoinEvent}>JOIN THIS EVENT</Button>
              }
                
          {event.hostUid === currentUserUID &&
            <Button as={Link} to={`/manageEvent/${event.id}`} color="orange" floated="right">
              Manage Event
              </Button>
          }
              </Segment>
            </Segment.Group>
    )
}

export default EventDetailsHeader;
