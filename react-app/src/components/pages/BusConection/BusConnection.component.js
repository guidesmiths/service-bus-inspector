import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ButtonRow from '../../commons/ButtonRow/ButtonRow';
import DeleteModal from '../../commons/DeleteModal/DeleteModal';
import Card from '../../commons/Card/Card';
import Toaster from '../../commons/Toaster/Toaster.container';
import NavBar from '../../commons/NavBar/NavBar';
import './BusConnection.css';

const BusConnection = ({ content, activeList, dlqList, getDlq, getActive, deleteDlq, isLoading, setLoading, toastMessage, deleteActive, hasValidToken, checkToken, isCheckingToken, busConnectionParams, ...props }) => {
  const { mode, namespace, topic, subscription, activeCount, dlqCount } = busConnectionParams;

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    !hasValidToken && props.history.push('/login');
    !subscription && props.history.push('/home');
  }, [hasValidToken, props.history, subscription]);

  useEffect(() => {
    if (!isCheckingToken && hasValidToken) {
      if (mode === 'peekactive') {
        onClickPeekActive();
      }
      if (mode === 'peekdlq') {
        onClickPeekDlq();
      }
    }
  }, [isCheckingToken, hasValidToken, mode]);

  const [nowIn, setNowIn] = useState(mode);
  const [numDlq, setNumDlq] = useState(dlqCount);
  const [numActive, setNumActive] = useState(activeCount);

  const onClickModal = value => setNowIn(value);
  const onClickNumActiveMessage = value => setNumActive(value);
  const onClickNumDlqMessage = value => setNumDlq(value);

  const onClickPeekDlq = () => {
    getDlq({ namespace, topic, subscription, numDlq });
    setLoading(true);
  };

  const onClickPeekActive = () => {
    getActive({ namespace, topic, subscription, numActive });
    setLoading(true);
  };

  const confirmedDeleteDlq = () => {
    setLoading(true);
    if (nowIn === 'deletedlq') deleteDlq({ topic, subscription, namespace });
    if (nowIn === 'deleteActive') deleteActive({ topic, subscription, namespace });
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
          peekDlqMethod={onClickPeekDlq}
          openModal={value => onClickModal(value)}
          isLoading={isLoading}
          peekActiveMethod={onClickPeekActive}
          numDlqMessage={onClickNumDlqMessage}
          numActiveMessage={onClickNumActiveMessage}
          isActive={busConnectionParams.mode === 'peekactive' ? true : false}
          dlqMessages={dlqList.length}
          activeMessages={activeList.length}
        />
        <div className="card-list">
          {nowIn === 'peekdlq' ? (
            content.length > 0 &&
            content.map(card => (
              <Card
                nowIn={nowIn}
                cardJson={card}
                key={card.messageId}
                header={card.messageId}
                errorDescription={card.userProperties.DeadLetterErrorDescription}
                deadLetterReason={card.userProperties.DeadLetterReason}
                attemptCount={card.userProperties.attemptCount}
              />
            ))
          ) : nowIn === 'peekactive' ? (
            activeList.length > 0 &&
            activeList.map(card => <Card nowIn={nowIn} cardJson={card} key={card.messageId} header={card.messageId} errorDescription={card.body.value} deadLetterReason={card.deliveryCount} attemptCount={card.userProperties.attemptCount} />)
          ) : nowIn === 'deletedlq' || nowIn === 'deleteActive' ? (
            <DeleteModal onConfirmDelete={confirmedDeleteDlq} modalAction={nowIn} onCloseModal={() => setNowIn('')} dlqMessages={numDlq} activeMessages={numActive} />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

BusConnection.propTypes = {
  getDlq: PropTypes.func.isRequired
};

export default BusConnection;
