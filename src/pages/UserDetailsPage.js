import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment } from "semantic-ui-react";
import moment from 'moment';
import { isLoaded, useFirebaseConnect } from 'react-redux-firebase';
import Loading from '../components/Loading';

const UserDetailedPage = ({ match }) => {
    useFirebaseConnect([
       `users/${match.params.id}` // { path: '/todos' } // object notation
    ])
    
    const user = useSelector((state) => state.firebase.data.users);

    let profile;
    
    if (user) {
        profile = user[match.params.id]
    }



    const yearOfBirth = profile && profile.dateOfBirth && moment(profile.dateOfBirth).format("YYYY");
    const currentYear = moment(Date.now()).format("YYYY");

    let age;
    
    if (yearOfBirth) {
        age = parseFloat(currentYear) - parseFloat(yearOfBirth);
    }

    if (!isLoaded(user)){
        return <Loading />
    }    

    return (
            <>
            {profile &&
                <Grid>
                    <Grid.Column width={16}>
                        <Segment>
                            <Item.Group>
                                <Item>
                                    <Item.Image avatar size='small' src={profile.photoURL || "/assets/images/user.png"} />
                                    <Item.Content verticalAlign='bottom'>
                                        <Header as='h1'>{profile.displayName || "Unknown"}</Header>
                                        <br />
                                        <Header as='h3'>{profile.occupation}</Header>
                                        <br />
                                        <Header as='h3'>{age && age}{profile.city && `, Lives in  ${profile.city}, ${profile.country}`}</Header>
                                    </Item.Content>
                                </Item>
                            </Item.Group>

                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment>
                            <Grid columns={2}>
                                <Grid.Column width={10}>
                                    <Header icon='smile' content={profile.displayName && `About ${profile.displayName}`} />
                                    <p>I am a: <strong>{profile.occupation}</strong></p>
                                    <p>Originally from <strong>{profile.country}</strong></p>
                                    <p>Member Since: <strong>
                                        {profile.createdAt && moment(new Date(profile.createdAt)).format("DD MMM YYYY")}
                                    </strong></p>
                                    <p>{profile.about}</p>

                                </Grid.Column>
                                <Grid.Column width={6}>

                                    <Header icon='heart outline' content='Interests' />
                                    <List>
                                        {profile.interests && profile.interests.length > 0 ? profile.interests.map((interest, idx) => {
                                            return <Item key={idx}>
                                                <Icon name='heart' />
                                                <Item.Content>{interest}</Item.Content>
                                            </Item>
                                        }) : <p>No interests</p>}
                                    </List>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Segment>
                            <Button color='teal' as={Link} to="/account" fluid basic content='Edit Profile' />
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <Segment attached>
                            <Header icon='calendar' content='Events' />
                            <Menu secondary pointing>
                                <Menu.Item name='All Events' active />
                                <Menu.Item name='Past Events' />
                                <Menu.Item name='Future Events' />
                                <Menu.Item name='Events Hosted' />
                            </Menu>

                            <Card.Group itemsPerRow={5}>

                                <Card>
                                    <Image src={'/assets/categoryImages/drinks.jpg'} />
                                    <Card.Content>
                                        <Card.Header textAlign='center'>
                                            Event Title
                                    </Card.Header>
                                        <Card.Meta textAlign='center'>
                                            28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                    </Card.Content>
                                </Card>

                                <Card>
                                    <Image src={'/assets/categoryImages/drinks.jpg'} />
                                    <Card.Content>
                                        <Card.Header textAlign='center'>
                                            Event Title
                                    </Card.Header>
                                        <Card.Meta textAlign='center'>
                                            28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                    </Card.Content>
                                </Card>

                            </Card.Group>
                        </Segment>
                    </Grid.Column>
                </Grid>
            }
            </>
        );
    }

export default UserDetailedPage;