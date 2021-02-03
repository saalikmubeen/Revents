import React, { useState, useEffect } from 'react';
import { Button, Form, Header, Segment, Select } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { useFirebaseConnect } from 'react-redux-firebase';
import { cancelEvent, createEvent, updateEvent } from '../actions/eventsActions';
import "react-datepicker/dist/react-datepicker.css";



const categoryOptions = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];


const EventForm = ({ match, history, auth }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(null);
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const eventId = match.params.id;

  useFirebaseConnect([`events`])
  
  const dispatch = useDispatch();
  const events = useSelector((state) => state.firebase.ordered.events);
  let event;

  if (events && events.length > 0 && eventId) {
    event = events.filter((event) => event.key === eventId)[0];

    if (event.value.hostUid !== auth.uid) {
        history.push("/events")
    }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      
      const eventObj = { title, date, city, venue, description, category };
    
      if (eventId) {
          dispatch(updateEvent(eventId, eventObj));
          history.push(`/events/${eventId}`);
      } else {
        console.log(eventObj)
        dispatch(createEvent({ ...eventObj }));
        history.push('/events')
      }
  }

  useEffect(() => {
    if (eventId && event) {
        setTitle(event.value.title)
        setDate(event.value.date)
        setCity(event.value.city)
        setVenue(event.value.venue)
        setCategory(event.value.category)
        setDescription(event.value.description)
    } else {
        setTitle('')
        setDate('')
        setCity('')
        setVenue('')
        setCategory('')
        setDescription('')
    }
  }, [eventId, event])


  return (
            <Segment>
                <Header sub color='teal' content="Event Details"/>      
                <Form onSubmit={handleSubmit}>
        
                  <Form.Field>
                    <label>Event Title</label>
                    <input placeholder="Give your event a name" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </Form.Field> 
        
                  <Form.Field>
                    <label>Category</label>
                    <Select placeholder='Category' options={categoryOptions} value={category} onChange={(e, data) => setCategory(data.value)} />
                    </Form.Field>
        
                  <Form.Field>
                    <label>Description</label>
                    <textarea placeholder="Tell us about your event" value={description} onChange={(e) => setDescription(e.target.value)} required rows={5}/>
                  </Form.Field>
        
                  <Header sub color='teal' content="Event Location Details"/>   
                  <Form.Field>
                    <label>City</label>
                    <input placeholder="City event is taking place" value={city} onChange={(e) => setCity(e.target.value)} required/>
                    </Form.Field>
        
                  <Form.Field>
                    <label>Venue</label>
                    <input placeholder="Enter the Venue of the event" value={venue} onChange={(e) => setVenue(e.target.value)} required/>
                  </Form.Field>
        
                  <Form.Field>
                    <label>Event Date</label>
                  <DatePicker selected={date ? new Date(date) : null} onChange={date => setDate(date)} showTimeSelect onChangeRaw={(e) => e.preventDefault() }
                      timeFormat="HH:mm" dateFormat="dd LLL yyy h:mm a" minDate={Date.now()} placeholderText="Event Date" required />
                  </Form.Field> 
      
                  <Button positive type="submit">
                    Submit
                  </Button>
                  
                  <Button type="button" onClick={() => eventId ? history.push(`/events/${eventId}`) : history.push('/events')}>Cancel</Button>
                  {eventId && event && event.value.cancelled ?
                  <Button type="button" color="green" floated="right" onClick={() => dispatch(cancelEvent(eventId, false))}>Reactivate Event</Button> :
                  <Button type="button" color="red" floated="right" onClick={() => dispatch(cancelEvent(eventId, true))}>Cancel Event</Button>}
                </Form>
               
              </Segment>
    )
}

export default EventForm;
