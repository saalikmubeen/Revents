import React, { useRef } from 'react';
import { Feed, Header, Segment, Sticky } from 'semantic-ui-react'
import EventActivityItem from './modals/EventActivityItem';

const EventActivity = ({ firebaseActivities }) => {
    const contextRef = useRef();
    let activities = [];

    if (firebaseActivities) {
        activities = firebaseActivities.map((activity) => {
            return { id: activity.key, ...activity.value }
        })
    }
    return (
        <>
            {activities && 
            <Sticky context={contextRef.current}  offset={100} styleElement={{zIndex: 0}}>
            <Header attached="top" content="Recent Activity" />
                <Segment attached="bottom">
                    <Feed>
                    {activities.map(activity => (
                        <EventActivityItem activity={activity} key={activity.id} />
                    ))}
        </Feed>
                </Segment>
            </Sticky>
            }
        </>
    )
}

export default EventActivity;
