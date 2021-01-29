import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

const modals = {
    LoginForm: LoginForm,
    RegisterForm: RegisterForm
}

const ModalManager = () => {
    const modal = useSelector((state) => state.modal);

    const Modal = modal ? modals[modal.modalType] : null
    console.log(Modal)
    return (
        <>
            {Modal && <Modal />}
        </> 
    )
}

export default ModalManager;
