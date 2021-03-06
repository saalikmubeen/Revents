import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Image } from 'semantic-ui-react';
import { logoutUser } from '../actions/authActions';

const SignedInMenu = ({ profile, auth }) => {
  const dispatch = useDispatch();
    return (
            <Menu.Item position="right">
            <Image avatar spaced="right" src={profile.photoURL || '/assets/images/user.png'} />
              <Dropdown pointing="top left" text={profile.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
                  <Dropdown.Item as={Link} to={`/profile/${auth.uid}`} text="My Profile" icon="user" />
                  <Dropdown.Item as={Link} to="/account" text="Settings" icon="settings" />
                  <Dropdown.Item text="Sign Out" icon="power" onClick={() => dispatch(logoutUser())} />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
    )
}

export default SignedInMenu
