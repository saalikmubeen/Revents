import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ModalManager from './components/modals/ModalManager';
import NavBar from './components/NavBar';
import AccountPage from './pages/AccountPage';
import EventDetailsPage from './pages/EventDetailsPage';
import EventForm from './pages/EventForm';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage'


const App = () => {
  return (
    <>
       <ModalManager/>
      <Route path="/" exact component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/events' component={EventsPage} />
              <Route path={['/createEvent', '/manageEvent/:id']} component={ EventForm}/>
              <Route path='/events/:id' component={EventDetailsPage} />
              <Route path="/account" component={AccountPage} />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default App
