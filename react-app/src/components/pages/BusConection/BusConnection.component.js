import React, { useState, useEffect } from 'react';
import ButtonRow from '../../commons/ButtonRow/ButtonRow';
import DeleteModal from '../../commons/DeleteModal/DeleteModal';
import PublishModal from '../../commons/PublishModal/PublishModal';
import Card from '../../commons/Card/Card';
import Toaster from '../../commons/Toaster/Toaster.container';
import NavBar from '../../commons/NavBar/NavBar';
import { getActive, getDlq, deleteActive, deleteDlq, getSubscriptionDetail, republishMessage } from '../../../api/contentAPI';
import './BusConnection.css';

const BusConnection = ({ isLoading, setLoading, toastMessage, setToasterMessage, hasValidToken, checkToken, isCheckingToken, busConnectionParams, ...props }) => {
	const { namespace, topic, subscription } = props.match.params;
	const [deleteMode, setDeleteMode] = useState(false);
	const [publishMode, setPublishMode] = useState(false);
	const [messageToPublish, setMessageToPublish] = useState({});
	const [activeList, setActiveList] = useState([]);
	const [dlqList, setDlqList] = useState([]);


	useEffect(() => {
		checkToken();
		if (hasValidToken) {
			getMessages()
		} else {
			props.history.push('/login');
		}
	}, []);

	const getMessages = async () => {
		const sharedParams = { namespace, topic, subscription };
		try {
			setLoading(true);
			const subscriptionDetail = await getSubscriptionDetail(props.match.params);
			const { activeMessageCount, deadLetterMessageCount } = subscriptionDetail.data.properties.countDetails;
			const activeList = await getActive({ numMessages: activeMessageCount > 50 ? 50 : activeMessageCount, ...sharedParams });
			const dlqList = await getDlq({ numMessages: deadLetterMessageCount > 50 ? 50 : deadLetterMessageCount, ...sharedParams });
			console.log('DLQ LIST ', dlqList);
			setActiveList(activeList);
			setDlqList(dlqList);
		} catch (error) {
			setToasterMessage({ message: error.message, action: 'Error Getting Messages' });
		} finally {
			setLoading(false);
		}
	};

	const deleteMessages = async () => {
		try {
			setLoading(true);
			const response = await (deleteMode === 'active' ? deleteActive(topic, subscription) : deleteDlq(topic, subscription));
			setToasterMessage({ message: 'Messages deleted successfully', action: response });
		} catch (error) {
			setToasterMessage({ message: error.message, action: 'Error Deleting Active Messages' });
		} finally {
			setLoading(false);
		}
	};

	const republishMessageFromDlq = async body => {
		try {
			setLoading(true);
			const messageFromRepublish = await republishMessage(topic, subscription, body);
			setToasterMessage({ message: messageFromRepublish, action: 'Republish message' });
		} catch (error) {
			setToasterMessage({ message: error.message, action: 'Error Republishing Message' });
		} finally {
			setLoading(false);
		}
	};

	const openPublishModal = (message, messageId) => {
		if (message !== null && typeof message === 'object' && message.constructor === Object ) {
			setMessageToPublish({ messageId, ...message });
		} else {
			setMessageToPublish({ messageId, message });
		}
		setPublishMode(true);
	};

	return (
		<>
			<NavBar/>
			<div className="busConnectionContainer">
				{toastMessage !== [] && toastMessage.map((element, index) =>
					<Toaster
						key={index}
						message={element.message}
						action={element.action}
					/>)}
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
					openModal={setDeleteMode}
					isLoading={isLoading}
					activeCount={activeList.length}
					dlqCount={dlqList.length}
				/>
				<div className="listContainers">
					{activeList.length > 0 &&
					<div className="cardList">
						<h5>Active Messages</h5>
						{activeList.map(card => (
							<Card
								mode={'peekActive'}
								cardJson={card}
								key={card.messageId}
								header={card.messageId}
								errorDescription={card.userProperties.DeadLetterErrorDescription}
								deadLetterReason={card.userProperties.DeadLetterReason}
								attemptCount={card.userProperties.attemptCount}
							/>
						))}
					</div>}
					{dlqList.length > 0 &&
					<div className="cardList">
						<h5>DLQ Messages</h5>
						{dlqList.map(card => (
							<Card
								mode={'peekDlq'}
								cardJson={card}
								key={card.messageId}
								header={card.messageId}
								errorDescription={card.userProperties.DeadLetterErrorDescription}
								deadLetterReason={card.userProperties.DeadLetterReason}
								attemptCount={card.userProperties.attemptCount}
								onOpenPublishModal={() => openPublishModal(card.body, card.messageId)}
							/>
						))}
					</div>}
				</div>
				{deleteMode === 'active' &&
				<DeleteModal
					onConfirmDelete={deleteMessages}
					modalAction={'peekactive'}
					onCloseModal={() => setDeleteMode(false)}
					dlqMessages={dlqList.length}
					activeMessages={activeList.length}
				/>}
				{deleteMode === 'dlq' &&
				<DeleteModal
					onConfirmDelete={deleteMessages}
					modalAction={'peekdlq'}
					onCloseModal={() => setDeleteMode(false)}
					dlqMessages={dlqList.length}
					activeMessages={activeList.length}
				/>}
				{publishMode && 
				<PublishModal
					onConfirmPublish={() => republishMessageFromDlq(messageToPublish)}
					onCloseModal={() => setPublishMode(false)}
					messageToPublish={messageToPublish}
				/>}
			</div>
		</>
	);
};

export default BusConnection;
