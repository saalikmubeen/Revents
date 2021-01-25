import React from 'react'
import { useSelector } from 'react-redux';
import EventsListItem from './EventsListItem';

const EventsList = () => {
    const events = useSelector((state) => state.events)

    return (
        <>
            {events.map((event) => <EventsListItem event={event} key={ event.id } />)}
        </>
    )
}

export default EventsList;
