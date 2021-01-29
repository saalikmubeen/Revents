import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from '../../actions/modalActions';


const ModalWrapper = ({ children, header }) => {
    const dispatch = useDispatch();
    return (
        <Modal open={true} size="small" onClose={() => dispatch(closeModal())}>
            {header && <Modal.Header>{header}</Modal.Header>}
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}

export default ModalWrapper;