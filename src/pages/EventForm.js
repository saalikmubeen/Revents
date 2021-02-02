import React from 'react'
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import EventFormComponent from '../components/EventForm';

const EventForm = ({ match, history }) => {
    const auth = useSelector((state) => state.firebase.auth);

    if (isLoaded(auth) && isEmpty(auth)) {
        return <Redirect to="/events"/>
    }
    return (
        <Grid>
            <Grid.Column computer={10} mobile={16}>
                <EventFormComponent match={match} history={history} auth={ auth} />
            </Grid.Column>
        </Grid>
    )
}

export default EventForm;
