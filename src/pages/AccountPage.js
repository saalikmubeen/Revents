import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Header, Form, Label, Button, Icon } from 'semantic-ui-react';
import { updatePassword } from '../actions/authActions';

const AccountPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const authProvider = useSelector((state) => state.firebase.auth.providerData && state.firebase.auth.providerData[0].providerId);
    const { loading } = useSelector((state) => state.async);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        } 

        dispatch(updatePassword(password));
        setError(null);

    }
  return (
    <Segment>
        <Header dividing size="large" content="Account" />
          {authProvider && authProvider === "password" &&
              <div>
                  <Header color="teal" sub content="Change password" />
                  <p>Use this form to update your account settings</p>
                  <Form onSubmit={handleSubmit}>
                      <Form.Field>
                          <label>New Password</label>
                          <input placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required type="password"/>
                      </Form.Field>
            
                      <Form.Field>
                          <label>Confirm Password</label>
                          <input placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type="password" /> 
                      </Form.Field>
                      
                  {error && <Label basic color="red">{error}</Label>}

                  <Button size="large" loading={loading} positive content="Update Password" style={{ marginTop: '1rem' }} />
                  </Form>
              </div>
          }  

          {authProvider && authProvider === 'facebook.com' &&
              <div>
                  <Header color="teal" sub content="Facebook Account" />
                  <p>Please visit Facebook to update your account settings</p>
                  <Button type="button" color="facebook">
                      <Icon name="facebook" />
          Go to Facebook
        </Button>
              </div>
          }        

          {authProvider && authProvider === 'google.com' &&
              <div>
                  <Header color="teal" sub content="Google Account" />
                  <p>Please visit Google to update your account settings</p>
                  <Button type="button" color="google plus">
                      <Icon name="google plus" />
          Go to Google
        </Button>
              </div>
          }    
    </Segment>
  );
};

export default AccountPage;