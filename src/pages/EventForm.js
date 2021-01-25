import React from 'react'
import EventFormComponent from '../components/EventForm';

const EventForm = ({ match, history }) => {
    return (
        <EventFormComponent match={match} history={history} />
    )
}

export default EventForm;
