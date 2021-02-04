import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import UnAuthModal from './UnAuthModal';

const modals = {
    LoginForm: LoginForm,
    RegisterForm: RegisterForm,
    UnAuthModal: UnAuthModal
}

const ModalManager = () => {
    const modal = useSelector((state) => state.modal);

    const Modal = modal ? modals[modal.modalType] : null
    return (
        <>
            {Modal && <Modal />}
        </> 
    )
}

export default ModalManager;
