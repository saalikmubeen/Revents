import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ModalManager from './components/modals/ModalManager';
import NavBar from './components/NavBar';
import EventDetailsPage from './pages/EventDetailsPage';
import EventForm from './pages/EventForm';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage';
import SettingsDashboard from './pages/SettingsDashboard';
import UserDetailedPage from './pages/UserDetailsPage';


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
              <Switch>
              <Route exact path='/events' component={EventsPage} />
              <Route path={['/createEvent', '/manageEvent/:id']} component={ EventForm}/>
              <Route path='/events/:id' component={EventDetailsPage} />
              <Route path="/account" component={SettingsDashboard} />
              <Route path="/profile/:id" component={UserDetailedPage} />
              <Route component={NotFoundPage} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default App
