import React from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

const NavBar = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);

  const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
       <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/images/logo.png' alt='logo' style={{ marginRight: 15 }} />
          Re-Vents
        </Menu.Item>
          <Menu.Item as={NavLink} to='/events' name='Events' />
          
        {authenticated ? (
            <SignedInMenu profile={profile} auth={auth} />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>
    )
}

export default NavBar;
