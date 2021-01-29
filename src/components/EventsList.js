import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EventsListItem from './EventsListItem';
import { fetchEvents } from '../actions/eventsActions';

const EventsList = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events)


    useEffect(() => {
        dispatch(fetchEvents());

    }, [dispatch]);

    return (
        <>
            {events && events.map((event) => <EventsListItem event={event} key={ event.id } />)}
        </>
    )
}

export default EventsList;
