import React from 'react'
import { Grid } from 'semantic-ui-react';
import EventDetailsChat from '../components/EventDetailsChat';
import EventDetailsHeader from '../components/EventDetailsHeader';
import EventDetailsInfo from '../components/EventDetailsInfo';
import EventDetailsSidebar from '../components/EventDetailsSidebar';
import events from '../eventsData';


const EventDetailsPage = () => {
    const event = events[0]
    return (
        <Grid>
        <Grid.Column width={10}>
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat eventId={event.id} />
        </Grid.Column>
        <Grid.Column width={6}>
        <EventDetailsSidebar
          attendees={event?.attendees}
        />
      </Grid.Column>
    </Grid>
    )
}

export default EventDetailsPage;
