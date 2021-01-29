import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { socialLogin } from '../actions/authActions';

const SocialLogin = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Button icon='facebook' fluid color='facebook' style={{ marginBottom: 10 }} content='Login with Facebook' onClick={() => dispatch(socialLogin('facebook'))} />
            <Button icon='google' fluid color='google plus' content='Login with Google' onClick={ () => dispatch(socialLogin('google'))}/>
        </>
    )
}

export default SocialLogin;