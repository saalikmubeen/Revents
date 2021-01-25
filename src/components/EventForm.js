import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';

const EventForm = () => {
    return (
              <Segment>
                <Form>
                  <Form.Field>
                    <label>Event Title</label>
                    <input placeholder="Event Name" />
                  </Form.Field>
                  <Form.Field>
                    <label>Event Date</label>
                    <input type="date" placeholder="Event Date" />
                  </Form.Field>
                  <Form.Field>
                    <label>City</label>
                    <input placeholder="City event is taking place" />
                  </Form.Field>
                  <Form.Field>
                    <label>Venue</label>
                    <input placeholder="Enter the Venue of the event" />
                  </Form.Field>
                  <Form.Field>
                    <label>Hosted By</label>
                    <input placeholder="Enter the name of person hosting" />
                  </Form.Field>
                  <Button positive type="submit">
                    Submit
                  </Button>
                  <Button type="button">Cancel</Button>
                </Form>
              </Segment>
    )
}

export default EventForm;
