import React from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const EventActivityItem = ({ activity }) => {

   const renderSummary = activity => {
    switch (activity.type) {
      case 'New Event':
        return (
          <div>
            New Event!{' '}
            <Feed.User
              as={Link}
              to={`/profile/${activity.hostUid}`}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            is hosting{' '}
            <Link to={`/events/${activity.eventId}`}>
              {activity.title}
            </Link>
          </div>
        );
      case 'Cancel Event':
        return (
          <div>
            Event Cancelled!{' '}
            <Feed.User
              as={Link}
              to={`/profile/${activity.hostUid}`}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            has cancelled{' '}
            <Link to={`/events/${activity.eventId}`}>
              {activity.title}
            </Link>
          </div>
        );
      default:
        return;
    }
  };

    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || '/assets/images//user.png'} alt='' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {moment(activity.timestamp).fromNow()}
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }

export default EventActivityItem;
