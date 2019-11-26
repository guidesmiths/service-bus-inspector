import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ButtonRow from '../../commons/ButtonRow/ButtonRow';
import DeleteModal from '../../commons/DeleteModal/DeleteModal';
import Card from '../../commons/Card/Card'
import Toaster from '../../commons/Toaster/Toaster.container';
import NavBar from '../../commons/NavBar/NavBar';

import './BusConnection.css';

const BusConnection = ({
    content,
    activeList,
    dlqList,
    getDlq,
    getActive,
    deleteDlq,
    isLoading,
    setLoading,
    toastMessage,
    deleteActive,
    match,
    location,
    ...props
}) => {

    useEffect(() => {
        if(toastMessage.length > 0 && toastMessage[0].action === 'Error Getting Active Messages' || toastMessage.length > 0 && toastMessage[0].action === 'Error Getting DLQ' || toastMessage.length > 0 && toastMessage[0].action === 'Error Deleting DLQ' || toastMessage.length > 0 && toastMessage[0].action === 'Error Deleting Active Messages') {
            props.history.push('/login')
        } 
     }, [toastMessage]);

     useEffect(() => {
        checkToken();
        if(match.params.activeordlq === 'peekactive') {
            onClickPeekActive();
        } 
        if(match.params.activeordlq === 'peekdlq') {
            onClickPeekDlq();
        }
        if(isTokenValid === false) {
            props.history.push('/login')
        }
     }, [])
    
    const [nowIn, setNowIn] = useState(match.params.activeordlq);
    const [nameSpace] = useState(match.params.namespace)
    const [topic] = useState(match.params.topic);
    const [sub] = useState(match.params.subscription);
    const [numDlq, setNumDlq] = useState(match.params.messagecount);
    const [numActive, setNumActive] = useState(match.params.messagecount);
    const [isTokenValid, setToken] = useState('');

    const onClickModal = (value) => setNowIn(value);
    const onClickNumActiveMessage = (value) => setNumActive(value);
    const onClickNumDlqMessage = (value) => setNumDlq(value);

    const onClickPeekDlq = () => {
        getDlq({ nameSpace, topic, sub, numDlq })
        setLoading(true)
    }

    const checkToken = async () => {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4001/tokenhealth',
            headers: {
              Authorization: localStorage.getItem('token'),
             },
          });
          setToken(response.data);
          return response.data;
    }

    const onClickPeekActive = () => {
        getActive({ nameSpace, topic, sub, numActive })
        setLoading(true)
    }

    const confirmedDeleteDlq = () => {
        setLoading(true)
        if (nowIn === 'deletedlq') deleteDlq({ topic, sub, nameSpace })
        if (nowIn === 'deleteActive') deleteActive({ topic, sub, nameSpace })
    }

    return (
        <>
            <NavBar />
            <div className="busConnectionContainer">
                {toastMessage !== [] &&
                    toastMessage.map((element, index) => (
                        <Toaster
                            key={index}
                            message={element.message}
                            action={element.action}
                        />)
                    )
                }
                <div className="wrap">
                    <div className="nameContainer">
                        <div className="title">Namespace</div>
                        <div className="subtitle">{nameSpace}</div>
                    </div>
                    <div className="nameContainer">
                        <div className="title">Topic</div>
                        <div className="subtitle">{topic}</div>
                    </div>
                    <div className="nameContainer">
                        <div className="title">Subscription</div>
                        <div className="subtitle">{sub}</div>
                    </div>
                </div>
                <ButtonRow
                    peekDlqMethod={onClickPeekDlq}
                    openModal={(value) => onClickModal(value)}
                    isLoading={isLoading}
                    peekActiveMethod={onClickPeekActive}
                    numDlqMessage={onClickNumDlqMessage}
                    numActiveMessage={onClickNumActiveMessage}
                    isActive={match.params.activeordlq === 'peekactive' ? true : false}
                    dlqMessages={dlqList.length}
                    activeMessages={activeList.length}
                />
                <div className="card-list">
                    {nowIn === "peekdlq" ?
                        content.length > 0 && content.map(card => (
                            <Card
                                nowIn={nowIn}
                                cardJson={card}
                                key={card.messageId}
                                header={card.messageId}
                                errorDescription={card.userProperties.DeadLetterErrorDescription}
                                deadLetterReason={card.userProperties.DeadLetterReason}
                                attemptCount={card.userProperties.attemptCount}
                            />
                        )) : nowIn === "peekactive" ?
                            activeList.length > 0 && activeList.map(card => (
                                <Card
                                    nowIn={nowIn}
                                    cardJson={card}
                                    key={card.messageId}
                                    header={card.messageId}
                                    errorDescription={card.body.value}
                                    deadLetterReason={card.deliveryCount}
                                    attemptCount={card.userProperties.attemptCount}
                                />
                            )) : nowIn === "deletedlq" || nowIn === "deleteActive" ?
                                <DeleteModal
                                    onConfirmDelete={confirmedDeleteDlq}
                                    modalAction={nowIn}
                                    onCloseModal={() => setNowIn('')}
                                    dlqMessages={match.params.messagecount}
                                    activeMessages={match.params.messagecount}
                                />
                                : ''
                    }
                </div>
            </div >
        </>
    )
}

BusConnection.propTypes = {
    getDlq: PropTypes.func.isRequired,
};

export default BusConnection;
