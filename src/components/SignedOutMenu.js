import React from 'react'
import { useDispatch } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import { openModal } from '../actions/modalActions';

const SignedOutMenu = () => {
    const dispatch = useDispatch();
    return (
        <Menu.Item position='right'>
            <Button basic inverted content='Login' onClick={() => dispatch(openModal("LoginForm")) }/>
            <Button basic inverted content='Register' style={{ marginLeft: '0.5em' }} onClick={() => dispatch(openModal("RegisterForm")) }/>
        </Menu.Item>
    )
}

export default SignedOutMenu;
