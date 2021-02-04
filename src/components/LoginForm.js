import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Form, Label } from 'semantic-ui-react';
import ModalWrapper from './modals/ModalWrapper';
import SocialLogin from './SocialLogin';
import { loginUser } from '../actions/authActions';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(loginUser(email, password));

    }

    return (
        <ModalWrapper header="Login to Re-vents">

        <Form onSubmit={handleSubmit}>
        
            <Form.Field>
                <label>Email Address</label>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </Form.Field>  
            
            <Form.Field>
                <label>Password</label>
                <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Field>
            
                {error && <Label basic color="red">{error}</Label>}

            <Button loading={loading} positive type="submit" fluid size="large" color="teal" style={{marginTop: '1rem'}}> Login </Button>

            </Form>

            <Divider horizontal>OR</Divider>

            <SocialLogin />
            
        </ModalWrapper>    
    )
}

export default LoginForm;
