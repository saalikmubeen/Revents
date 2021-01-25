import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import EventDetailsPage from './pages/EventDetailsPage';
import EventForm from './pages/EventForm';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage'


const App = () => {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventsPage} />
              <Route path="/createEvent" component={ EventForm}/>
              <Route path='/events/:id' component={EventDetailsPage} />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default App
