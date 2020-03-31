import React, { useState, useEffect } from 'react';
import ButtonRow from '../../commons/ButtonRow/ButtonRow';
import DeleteModal from '../../commons/DeleteModal/DeleteModal';
import Card from '../../commons/Card/Card';
import Toaster from '../../commons/Toaster/Toaster.container';
import NavBar from '../../commons/NavBar/NavBar';
import { getActive, getDlq, deleteActive, deleteDlq } from '../../../api/contentAPI';
import './BusConnection.css';

const BusConnection = ({ isLoading, setLoading, toastMessage, setToasterMessage, hasValidToken, checkToken, isCheckingToken, busConnectionParams, ...props }) => {
	const { mode, namespace, topic, subscription, activeCount, dlqCount } = busConnectionParams;

	const [numDlq, setNumDlq] = useState(dlqCount > 20 ? 20 : dlqCount);
	const [numActive, setNumActive] = useState(activeCount > 20 ? 20 : activeCount);
	const [totalDlq, setTotalDlq] = useState(dlqCount);
	const [totalActive, setTotalActive] = useState(activeCount);
	const [listOfMessages, setListOfMessages] = useState([]);
	const [deleteMode, setDeleteMode] = useState(false);

	useEffect(() => {
		checkToken();
	}, [checkToken]);

	useEffect(() => {
		!hasValidToken && props.history.push('/login');
		!subscription && props.history.push('/home');
	}, [hasValidToken, props.history, subscription]);

	useEffect(() => {
		if (!isCheckingToken && hasValidToken) {
			getMessages();
		}
	}, [isCheckingToken, hasValidToken, mode, numDlq, numActive, setToasterMessage, setLoading]);

	const getMessages = async () => {
		const sharedParams = { namespace, topic, subscription };
		try {
			setLoading(true);
			const content = await (mode === 'peekactive' ? getActive({ numMessages: numActive, ...sharedParams }) : getDlq({ numMessages: numDlq, ...sharedParams }));
			if (content.length === 0) {
				setToasterMessage({ message: 'There are no messages in this queue', action: 'No Messages' });
				setListOfMessages([]);
			} else {
				setListOfMessages(content);
			}
		} catch (error) {
			setToasterMessage({ message: error.message, action: 'Error Getting Messages' });
			setListOfMessages([]);
		} finally {
			setLoading(false);
		}
	};

	const deleteMessages = async () => {
		try {
			setLoading(true);
			const response = await (mode === 'peekactive' ? deleteActive(topic, subscription) : deleteDlq(topic, subscription));
			setToasterMessage({ message: 'Messages deleted successfully', action: response });
			setListOfMessages([]);
			if (mode === 'peekactive') {
				setNumActive(0);
				setTotalActive(0);
			} else {
				setNumDlq(0);
				setTotalDlq(0);
			}
		} catch (error) {
			setToasterMessage({ message: error.message, action: 'Error Deleting Active Messages' });
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<NavBar />
			<div className="busConnectionContainer">
				{toastMessage !== [] && toastMessage.map((element, index) => <Toaster key={index} message={element.message} action={element.action} />)}
				<div className="wrap">
					<div className="nameContainer">
						<div className="title">Namespace</div>
						<div className="subtitle">{namespace}</div>
					</div>
					<div className="nameContainer">
						<div className="title">Topic</div>
						<div className="subtitle">{topic}</div>
					</div>
					<div className="nameContainer">
						<div className="title">Subscription</div>
						<div className="subtitle">{subscription}</div>
					</div>
				</div>
				<ButtonRow
					peekMethod={mode === 'peekactive' ? setNumActive : setNumDlq}
					openModal={() => setDeleteMode(true)}
					isLoading={isLoading}
					isActive={mode === 'peekactive'}
					numOfMessages={mode === 'peekactive' ? numActive : numDlq}
					totalOfMessages={mode === 'peekactive' ? totalActive : totalDlq}
				/>
				<div className="card-list">
					{listOfMessages.length > 0 &&
						listOfMessages.map(card => (
							<Card
								mode={mode}
								cardJson={card}
								key={card.messageId}
								header={card.messageId}
								errorDescription={card.userProperties.DeadLetterErrorDescription}
								deadLetterReason={card.userProperties.DeadLetterReason}
								attemptCount={card.userProperties.attemptCount}
							/>
						))}
				</div>
				{deleteMode ? <DeleteModal onConfirmDelete={deleteMessages} modalAction={mode} onCloseModal={() => setDeleteMode(false)} dlqMessages={dlqCount} activeMessages={activeCount} /> : null}
			</div>
		</>
	);
};

export default BusConnection;
