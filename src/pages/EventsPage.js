import React from 'react'
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirebaseConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventActivity from '../components/EventActivity';
import EventsList from '../components/EventsList';
import Loading from '../components/Loading';

const EventsPage = () => {

     useFirebaseConnect([
        { path: '/events' }, // object notation
        { path: '/activities', queryParams: ['limitToLast=5'] }
    ]) 
    


    const firebaseEvents = useSelector((state) => state.firebase.ordered.events);
    const firebaseActivities = useSelector((state) => state.firebase.ordered.activities);

    let events = []

    if (isLoaded(firebaseEvents) && !isEmpty(firebaseEvents)) {
        console.log(firebaseEvents)
        events = firebaseEvents.map((event) => {
            console.log(event)
            return { id: event.key, ...event.value, attendees: Object.values(event.value.attendees) }
        });
    }

    if (!isLoaded(firebaseEvents) || !isLoaded(firebaseActivities)) {
        return <Loading/>
    }

    return (
        <Grid columns={2} stackable>
            <Grid.Column width={10}>
                <EventsList events={ events } />
            </Grid.Column>
            
            <Grid.Column width={6}>
                <EventActivity firebaseActivities={firebaseActivities} />
            </Grid.Column>
        </Grid>
    )
}

export default EventsPage;
