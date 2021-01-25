import React from 'react'
import { Grid } from 'semantic-ui-react';
import EventsList from '../components/EventsList';

const EventsPage = () => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventsList/>
            </Grid.Column>
            
            <Grid.Column width={6}>
                <h2>Activity Feed</h2>
            </Grid.Column>
    </Grid>
    )
}

export default EventsPage;
