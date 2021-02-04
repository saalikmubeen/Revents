import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment } from "semantic-ui-react";
import moment from 'moment';
import { isEmpty, isLoaded, useFirebaseConnect } from 'react-redux-firebase';
import Loading from '../components/Loading';
import NotFoundPage from './NotFoundPage';

const UserDetailedPage = ({ match, history }) => {
    useFirebaseConnect([
        { path: `users/${match.params.id}` },
        {path: `events`}
    ])
    
    const user = useSelector((state) => state.firebase.data.users);
    const auth = useSelector((state) => state.firebase.auth);
    const firebaseEvents = useSelector((state) => state.firebase.ordered.events)

    let profile;
    
    if (user) {
        profile = user[match.params.id]
    }


    const yearOfBirth = profile && profile.dateOfBirth && moment(profile.dateOfBirth).format("YYYY");
    const monthOfBirth = profile && profile.dateOfBirth && moment(profile.dateOfBirth).format("M");
    const currentYear = moment(Date.now()).format("YYYY");
    const currentMonth = moment(Date.now()).format("M");

    let age;
    
    if (yearOfBirth) {
        age = parseFloat(currentYear) - parseFloat(yearOfBirth);

        if (parseFloat(monthOfBirth) > parseFloat(currentMonth)) {
            age--;
        }
    }

 
    let events = []

    if (isLoaded(firebaseEvents) && !isEmpty(firebaseEvents)) {
        const filteredEvents = firebaseEvents && firebaseEvents.filter((event) => event.value.hostUid === match.params.id)
        events = filteredEvents.map((event) => {
            return { id: event.key, ...event.value }
        })
    }

    if (!isLoaded(user)){
        return <Loading />
    }    

    if (isLoaded(user) && !user[match.params.id]) {
        return <NotFoundPage history={history} />
    }

    return (
            <>
            {profile &&
                <Grid>
                    <Grid.Row>
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
                    </Grid.Row>
                    
                <Grid.Row columns={2}>
                    <Grid.Column mobile={16} tablet={12} computer={12}>
                        <Segment>
                            <Grid columns={2}>
                                <Grid.Column mobile={16} tablet={10} computer={10}>
                                    <Header icon='smile' content={profile.displayName && `About ${profile.displayName}`} />
                                    <p>I am a: <strong>{profile.occupation}</strong></p>
                                    <p>Originally from <strong>{profile.country}</strong></p>
                                    <p>Member Since: <strong>
                                        {profile.createdAt && moment(new Date(profile.createdAt)).format("DD MMM YYYY")}
                                    </strong></p>
                                    <p>{profile.about}</p>

                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={6} computer={6}>

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
                    <Grid.Column mobile={16} tablet={4} computer={4}>
                        
                        {auth.uid === match.params.id &&
                            <Segment>
                                <Button color='teal' as={Link} to="/account" fluid basic content='Edit Profile' size="mini"/>
                            </Segment>
                        }

                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                    <Grid.Column mobile={16} tablet={12} computer={12}>
                        <Segment attached>
                            <Header icon='calendar' content='Events' />
                            <Menu secondary pointing>
                                <Menu.Item name={`Events hosted by ${profile.displayName}`} active />
                            </Menu>

                            <Card.Group itemsPerRow={4} stackable>

                            {events && events.length > 0 ? events.map((event) => {
                                return (
                            
                                <Card key={event.id} as={Link} to={`/events/${event.id}`}>
                                    <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                                    <Card.Content>
                                        <Card.Header textAlign='center'>
                                            {event.title}
                                    </Card.Header>
                                        <Card.Meta textAlign='center'>
                                        {moment(event.date).format('ddd MMM Do YYYY, h:mm A')}
                                    </Card.Meta>
                                    </Card.Content>
                                </Card>
                                )
                            }) :
                                <p style={{margin: "1rem"}}>{ profile.displayName } havent't hosted any events yet!</p>
                            }

                            </Card.Group>
                        </Segment>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            }
            </>
        );
    }

export default UserDetailedPage;