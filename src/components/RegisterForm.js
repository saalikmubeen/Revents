import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Form, Label } from 'semantic-ui-react';
import { registerUser } from '../actions/authActions';
import ModalWrapper from './modals/ModalWrapper';
import SocialLogin from './SocialLogin';


const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(registerUser({ name, email, password }));
    }

    return (
        <ModalWrapper header="Sign up to Re-vents">
        <Form onSubmit={handleSubmit}>
        
            <Form.Field>
                <label>Username</label>
            <input placeholder="Known as" value={name} onChange={(e) => setName(e.target.value)} required/>
            </Form.Field>  

            <Form.Field>
                <label>Email Address</label>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </Form.Field>  
            
            <Form.Field>
                <label>Password</label>
                <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Field>
            
            {error && <Label basic color="red">{error}</Label>}

            <Button loading={loading} positive type="submit" fluid size="large" color="teal" style={{ marginTop: '1rem' }}> Register </Button>

        </Form>
            <Divider horizontal>Or</Divider>
            
            <SocialLogin />    
        </ModalWrapper>    
    )
}

export default RegisterForm;
