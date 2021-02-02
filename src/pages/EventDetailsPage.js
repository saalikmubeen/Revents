import React from 'react'
import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import EventDetailsChat from '../components/EventDetailsChat';
import EventDetailsHeader from '../components/EventDetailsHeader';
import EventDetailsInfo from '../components/EventDetailsInfo';
import EventDetailsSidebar from '../components/EventDetailsSidebar';
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import Loading from '../components/Loading';


const EventDetailsPage = ({ match }) => {

    useFirebaseConnect([
       `events`       // { path: '/events' } // object notation
    ])
    
    const events = useSelector((state) => state.firebase.ordered.events);

    let eventDetails;
    if (isLoaded(events) && !isEmpty(events)) {
      const event = events.filter((event) => event.key === match.params.id)[0];
      eventDetails = event ? {...event.value, id: event.key,  attendees: Object.values(event.value.attendees)} : undefined
  }
  
  if (!isLoaded(events)) {
    return <Loading />
  }
  
    return (
        <>
        {eventDetails &&
          <Grid columns={2} stackable>
            <Grid.Column width={10}>
              <EventDetailsHeader event={eventDetails} />
              <EventDetailsInfo event={eventDetails} />
              <EventDetailsChat event={eventDetails} />
            </Grid.Column>
            <Grid.Column width={6}>
              <EventDetailsSidebar
                event={eventDetails}
              />
            </Grid.Column>
          </Grid>
        }
       </> 
    )
}

export default EventDetailsPage;
