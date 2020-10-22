import React, { useState } from 'react';
import Modal from 'react-modal';
import './PublishModal.css';

const DeleteModal = ({ onConfirmPublish, onCloseModal, messageToPublish }) => {
	const [modalIsOpen, setModalIsOpen] = useState(true);
	const { messageId } = messageToPublish;

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)'
		}
	};

	const closeModal = () => {
		setModalIsOpen(!modalIsOpen);
		onCloseModal();
	};

	return (
		<div className="card" tabIndex="-1" role="dialog">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Delete Modal" ariaHideApp={false}>
						<div className="modal-body">
							<h5>You are about to republish a message from the Dead Letter Queue with ID {messageId}. Are you sure?</h5>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>
								Close
							</button>
							<button type="button" className="btn btn-primary" onClick={() => [onConfirmPublish(), closeModal()]}>
								Yes
							</button>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
