import React, { useState, useEffect } from 'react';
import { Button, Form, Header, Segment, Select } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import DatePicker from 'react-datepicker';
import { createEvent, updateEvent } from '../actions/eventsActions';
import "react-datepicker/dist/react-datepicker.css";


const categoryOptions = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];


const EventForm = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [hostedBy, setHostedBy] = useState('');

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  const eventId = match.params.id;

  const handleSubmit = (e) => {
      e.preventDefault();
      
      const eventObj = { title, date, city, venue, hostedBy, description, category };
    
      if (eventId) {
          dispatch(updateEvent(eventId, eventObj));
          history.push(`/events/${eventId}`);
      } else {
        console.log(eventObj)
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
        setCategory(event.category)
        setDescription(event.description)
    } else {
        setTitle('')
        setDate('')
        setCity('')
        setVenue('')
        setHostedBy('')
        setCategory('')
        setDescription('')
    }
  }, [eventId, events])

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
                      timeFormat="HH:mm" dateFormat="dd LLL yyy h:mm a" placeholderText="Event Date" required />
                  </Form.Field> 
        
                  <Form.Field>
                    <label>Hosted By</label>
                    <input placeholder="Enter the name of person hosting" value={hostedBy} onChange={(e) => setHostedBy(e.target.value)}required/>
                  </Form.Field>
                  <Button positive type="submit">
                    Submit
                  </Button>
                  <Button type="button" onClick={() => eventId ? history.push(`/events/${eventId}`) : history.push('/events')}>Cancel</Button>
                </Form>
              </Segment>
    )
}

export default EventForm;
