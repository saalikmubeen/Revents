import React from 'react';
import EventsListItem from './EventsListItem';


const EventsList = ({events}) => {
    
    return (
        <>
            {events && events.map((event) => <EventsListItem event={event} key={ event.id } />)}
        </>
    )
}

export default EventsList;
