import React from 'react';
import { useDispatch } from 'react-redux';
import {Modal, Button, Divider} from 'semantic-ui-react';
import { closeModal, openModal } from '../../actions/modalActions';


const UnAuthModal = (props) => {
    const dispatch = useDispatch();
        return (
            <Modal
                size='mini'
                open={true}
                onClose={() => dispatch(closeModal())}
            >
                <Modal.Header>
                    You need to be signed in to do that!
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Please either login or register to see this page</p>
                        <Button.Group widths={4}>
                            <Button fluid color='teal' onClick={() => dispatch(openModal("LoginForm"))}>Login</Button>
                            <Button.Or />
                            <Button fluid positive onClick={() => dispatch(openModal("RegisterForm"))}>Register</Button>
                        </Button.Group>
                        <Divider/>
                        <div style={{textAlign: 'center'}}>
                            <p>Or click cancel to continue as a guest</p>
                            <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
                        </div>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }

export default UnAuthModal;