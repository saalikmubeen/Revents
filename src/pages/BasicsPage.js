import React, { useState, useEffect } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../actions/authActions';
import { isLoaded } from 'react-redux-firebase';
import Loading from '../components/Loading';

const BasicsPage = () => {
    
    const profile = useSelector((state) => state.firebase.profile);

    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [homeTown, setHomeTown] = useState('');
    const [gender, setGender] = useState(null);

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.async);

    useEffect(() => {
        if (profile) {
            setName(profile.displayName || '');
            setDob(profile.dateOfBirth || '');
            setHomeTown(profile.city || '');
            setGender(profile.gender || '');
        }
    }, [profile]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ displayName: name, dateOfBirth: dob, city: homeTown, gender }));
    }

    if (!isLoaded(profile)) {
        return <Loading/>
    }

        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit}>
        
            <Form.Field>
                <label>Display Name</label>
            <input placeholder="Known as" value={name} onChange={(e) => setName(e.target.value)} required/>
            </Form.Field>

            <Form.Group inline>   
                <label>Gender: </label>
            <Form.Field>
                <div className="ui radio">
                    <input type="radio" name="gender" value="male" id="male" onChange={(e) => setGender(e.target.value)} checked={gender === "male"}/>
                    <label htmlFor="male">Male</label>            
                </div>            
            </Form.Field>
                    
            <Form.Field>
                <div className="ui radio">
                    <input type="radio" name="gender" value="female" id="female" onChange={(e) => setGender(e.target.value)} checked={gender === "female"}/>
                    <label htmlFor="female">Female</label>            
                </div>            
            </Form.Field>
            </Form.Group>    

            <Form.Field>
                <label>Date of Birth</label>
                <DatePicker selected={dob ? new Date(dob) : null} onChange={date => setDob(date)} onChangeRaw={(e) => e.preventDefault() }
                    dateFormat="dd LLL yyy" showMonthDropdown={true} showYearDropdown={true} dropdownMode="select" placeholderText="Date of Birth" required />
            </Form.Field>  
            
            <Form.Field>
                <label>Home Town</label>
                <input placeholder="Home Town" value={homeTown} onChange={(e) => setHomeTown(e.target.value)} required/>
            </Form.Field>

            <Divider/>
            <Button size='large' positive content='Update Profile' loading={loading}/>

            </Form>
            </Segment>
        );
}


                    
export default BasicsPage; 

