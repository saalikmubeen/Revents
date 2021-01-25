import React, { useState, useEffect } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { createEvent, updateEvent } from '../actions/eventsActions';



const EventForm = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [hostedBy, setHostedBy] = useState('');

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  const eventId = match.params.id;

  const handleSubmit = (e) => {
      e.preventDefault();
      
      const eventObj = { title, date, city, venue, hostedBy };
    
      if (eventId) {
          dispatch(updateEvent(eventId, eventObj));
          history.push(`/events/${eventId}`);
      } else {
        dispatch(createEvent({ ...eventObj, hostPhotoURL: '/assets/images/user.png', id: uuid() }));
        history.push('/events')
      }
  }

  useEffect(() => {
    if (eventId) {
        const event = events.filter((event) => event.id === eventId)[0];
        setTitle(event.title)
        setDate(event.date)
        setCity(event.city)
        setVenue(event.venue)
        setHostedBy(event.hostedBy)
    } else {
        setTitle('')
        setDate('')
        setCity('')
        setVenue('')
        setHostedBy('')
    }
  }, [eventId, events])

    return (
              <Segment>
                <Form onSubmit={handleSubmit}>
                  <Form.Field>
                    <label>Event Title</label>
                    <input placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Event Date</label>
                    <input type="date" placeholder="Event Date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>City</label>
                    <input placeholder="City event is taking place" value={city} onChange={(e) => setCity(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Venue</label>
                    <input placeholder="Enter the Venue of the event" value={venue} onChange={(e) => setVenue(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Hosted By</label>
                    <input placeholder="Enter the name of person hosting" value={hostedBy} onChange={(e) => setHostedBy(e.target.value)} />
                  </Form.Field>
                  <Button positive type="submit">
                    Submit
                  </Button>
                  <Button type="button" onClick={history.goBack}>Cancel</Button>
                </Form>
              </Segment>
    )
}

export default EventForm;
