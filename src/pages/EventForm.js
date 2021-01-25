import React from 'react'
import { Grid } from 'semantic-ui-react';
import EventFormComponent from '../components/EventForm';

const EventForm = ({ match, history }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventFormComponent match={match} history={history} />
            </Grid.Column>
        </Grid>
    )
}

export default EventForm;
