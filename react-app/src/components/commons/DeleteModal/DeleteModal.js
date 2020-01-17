import React, { useState } from 'react';
import Modal from 'react-modal';
import './DeleteModal.css';

const DeleteModal = ({ onConfirmDelete, modalAction, onCloseModal, dlqMessages, activeMessages }) => {
	const [modalIsOpen, setModalIsOpen] = useState(true);

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
							{modalAction === 'peekdlq' ? (
								<h5>You are about to delete all {dlqMessages} messages from the Dead Letter Queue. Are you sure?</h5>
							) : modalAction === 'peekactive' ? (
								<h5>You are about to delete all {activeMessages} Active Messages. Are you sure?</h5>
							) : (
								''
							)}
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>
								Close
							</button>
							<button type="button" className="btn btn-primary" onClick={() => [onConfirmDelete(), closeModal()]}>
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
