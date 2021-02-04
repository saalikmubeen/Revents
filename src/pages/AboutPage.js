import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { Button, Divider, Form, Header, Segment, Select } from 'semantic-ui-react';
import { updateProfile } from '../actions/authActions';
import Loading from '../components/Loading';


const interestOptions = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const AboutPage = ({ pristine, submitting }) => {
    const [status, setStatus] = useState('');
    const [about, setAbout] = useState('');
    const [occupation, setOccupation] = useState('');
    const [country, setCountry] = useState('');
    const [interests, setInterests] = useState([]);

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.firebase.profile);
     const { loading } = useSelector((state) => state.async);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ status, about, occupation, country, interests }));
    }


    useEffect(() => {
        if (profile) {
            setStatus(profile.status || '');
            setAbout(profile.about || '');
            setOccupation(profile.occupation || '');
            setCountry(profile.country || '');
            setInterests(profile.interests || []);
        }
    }, [profile])

    if (!isLoaded(profile)) {
        return <Loading/>
    }


    return (
    <Segment>
        <Header dividing size="large" content="About Me" />
        <h3>Complete your profile</h3>
        <Form onSubmit={handleSubmit}>
        <Form.Group inline>
            <label>Tell us your status: </label>
            <Form.Field>
                <div className="ui radio">
                    <input type="radio" name="relationStatus" value="single" id="single" onChange={(e) => setStatus(e.target.value)} checked={status === "single"}/>
                    <label htmlFor="single">Single</label>            
                </div>            
            </Form.Field>
                    
            <Form.Field>
                <div className="ui radio">
                    <input type="radio" name="relationStatus" value="relationship" id="relationship" onChange={(e) => setStatus(e.target.value)} checked={status === "relationship"}/>
                    <label htmlFor="relationship">Relationship</label>            
                </div>            
            </Form.Field>

            <Form.Field>
                <div className="ui radio">
                    <input type="radio" name="relationStatus" value="married" id="married" onChange={(e) => setStatus(e.target.value)} checked={status === "married"}/>
                    <label htmlFor="married">Married</label>            
                </div>            
            </Form.Field>      

        </Form.Group>
        <Divider />
        
        <Form.Field>
        <label>Tell us about yourself</label>
        <textarea placeholder="About me" value={about} onChange={(e) => setAbout(e.target.value)} />
        </Form.Field>
                    
        <Form.Field>
        <label>Your interests</label>
        <Select placeholder='Select your interests' options={interestOptions} value={interests} onChange={(e, data) => setInterests(data.value)} multiple/>
        </Form.Field>

        <Form.Field>
        <label>Occupation</label>
        <input type="text" placeholder="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)}/>
        </Form.Field>
        
        <Form.Field>
        <label>Country</label>
        <input type="text" placeholder="Country of Origin" value={country} onChange={(e) => setCountry(e.target.value)}/>
        </Form.Field>
        
        <Divider />
        <Button size="large" positive content="Update Profile" loading={loading}/>
      </Form>
    </Segment>
  );
};

export default AboutPage;