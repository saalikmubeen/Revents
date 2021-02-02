import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirebaseConnect } from 'react-redux-firebase';
import { Header, Segment, Comment, Form, Button } from 'semantic-ui-react';
import moment from 'moment';
import { addComment } from '../actions/eventsActions';
import { Link } from 'react-router-dom';

const EventDetailsChat = ({ event }) => {

  useFirebaseConnect([
      `comments/${event.id}`
  ])


  const dispatch = useDispatch();
  const auth = useSelector((state) => state.firebase.auth);
  const firebaseComments = useSelector((state) => state.firebase.ordered.comments);

  let comments = [];

  if (isLoaded(firebaseComments) && !isEmpty(firebaseComments)) {
    comments = firebaseComments[event.id] && firebaseComments[event.id].map((comment) => {
      return { id: comment.key, ...comment.value }
    })
  }

  const [comment, setComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    
    if (comment) {
      dispatch(addComment(event.id, comment));
    }

    setComment('');
  }


    return (
            <div>
              <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{ border: 'none' }}
              >
                <Header>Comments about this event</Header>
              </Segment>
        
              <Segment attached>
                <Comment.Group>
                  {comments && comments.map((comment) => {
                  return (
                  <Comment key={comment.id}>
                      <Comment.Avatar src={comment.photoURL || "/assets/images/user.png"} />
                    <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${comment.userUid}`}>{ comment.author }</Comment.Author>
                      <Comment.Metadata>
                        <div>{moment(comment.commentedAt).fromNow()}</div>
                      </Comment.Metadata>
                        <Comment.Text>{ comment.text }</Comment.Text>
                      <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                      </Comment.Actions>
                    </Comment.Content>
                    </Comment>
                  )
                  })}
        
            {auth.isLoaded && !auth.isEmpty &&
              <Form reply onSubmit={handleAddComment}>
              <Form.TextArea value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            }
                </Comment.Group>
              </Segment>
            </div>
    )
}

export default EventDetailsChat;
