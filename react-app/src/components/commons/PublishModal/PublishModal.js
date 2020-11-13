import React, { useState } from 'react';
import { JSONEditor } from 'react-json-editor-viewer';
import Modal from 'react-modal';
import './PublishModal.css';

const DeleteModal = ({ onConfirmPublish, onCloseModal, messageToPublish, setMessage }) => {
	const [modalIsOpen, setModalIsOpen] = useState(true);
	const { messageId, ... message } = messageToPublish;

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

	const editorStyles = {
		root: {
			fontSize: '1rem',
			margin: 5,
			lineHeight: 1.25
		},
		label: {
			'font-weight': 'bold',
			color: 'black',
			marginTop: 3,
			'align-self': 'center'
		},
		value: {
			marginLeft: 10,
			width: '250%'
		},
		row: {
			display: 'flex',
			padding: '0.2rem',
		},
		withChildrenLabel: {
			color: 'black',
			'font-weight': 'normal',
		},
		select: {
			borderRadius: 3,
			borderColor: 'grey',
			backgroundColor: 'lightGray',
		},
		input: {
			borderRadius: 3,
			border: '1px solid #272822',
			padding: '0.1rem',
			margin: '0.3rem',
			width: '100%'
		},
		addButton: {
			cursor: 'pointer',
			color: 'green',
			marginLeft:15,
			fontSize: '1.5rem'
		},
		removeButton: {
			cursor: 'pointer',
			color: 'red',
			marginLeft: 15,
			fontSize: '1.5rem'
		},
		builtin: {
			color: 'green',
			fontSize: 12
		},
		collapseIcon: {
			cursor: 'pointer',
			fontSize: '1rem',
			color: 'teal'
		}
	};

	const closeModal = () => {
		setModalIsOpen(!modalIsOpen);
		onCloseModal();
	};

	const onJsonChange = (key, value, parent, data) => {
		setMessage(data);
	};

	return (
		<div className="card" tabIndex="-1" role="dialog">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Publish Modal" ariaHideApp={false}>
						<div className="modal-body">
							<h5>You are about to republish a message from the Dead Letter Queue with ID {messageId}. Are you sure?</h5>
						</div>
							<JSONEditor 
								data={message}
								collapsible
								onChange={onJsonChange}
								styles={editorStyles}
							/>
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
