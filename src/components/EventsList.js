import React from 'react'
import events from '../eventsData';
import EventsListItem from './EventsListItem';

const EventsList = () => {
    return (
        <>
            {events.map((event) => <EventsListItem event={event} key={ event.id } />)}
        </>
    )
}

export default EventsList;
