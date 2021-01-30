import React from 'react'
import { Link, Redirect, Route } from 'react-router-dom';
import { Grid, Header, Menu } from 'semantic-ui-react';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import BasicsPage from './BasicsPage';

const SettingsDashboard = () => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Redirect from="/account" to="/account/basics"/>
                <Route path="/account/settings" exact component={AccountPage} />
                <Route path="/account/basics" exact component={BasicsPage} />
                <Route path="/account/about" exact component={AboutPage} />
            </Grid.Column>

                <Grid.Column width={4}>
                <Menu vertical>
                    <Header icon="user" attached inverted color="grey" content="Profile" />
                    <Menu.Item as={Link} to="/account/basics">Basics</Menu.Item>
                    <Menu.Item as={Link} to="/account/about">About Me</Menu.Item>
                    <Menu.Item as={Link} to="/account/photos">My Photos</Menu.Item>
                </Menu>
                <Grid.Row />
                    <Menu vertical>
                    <Header icon="settings" attached inverted color="grey" content="Account" />
                    <Menu.Item as={Link} to="/account/settings">My Account</Menu.Item>
                    </Menu>
                </Grid.Column>
        </Grid>
    )
}

export default SettingsDashboard;
