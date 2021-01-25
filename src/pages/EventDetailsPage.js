import React from 'react'
import { Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import EventDetailsChat from '../components/EventDetailsChat';
import EventDetailsHeader from '../components/EventDetailsHeader';
import EventDetailsInfo from '../components/EventDetailsInfo';
import EventDetailsSidebar from '../components/EventDetailsSidebar';


const EventDetailsPage = ({ match }) => {

    const events = useSelector((state) => state.events); 
    const event = events.filter((event) => event.id === match.params.id)[0];

  
    return (
        <>
        {event &&
          <Grid>
            <Grid.Column width={10}>
              <EventDetailsHeader event={event} />
              <EventDetailsInfo event={event} />
              <EventDetailsChat event={event} />
            </Grid.Column>
            <Grid.Column width={6}>
              <EventDetailsSidebar
                attendees={event?.attendees}
              />
            </Grid.Column>
          </Grid>
        }
       </> 
    )
}

export default EventDetailsPage;
