import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import './Card.css';

const Card = ({ header, errorDescription, deadLetterReason, attemptCount, cardJson, mode, onOpenPublishModal }) => {
    const [jsonViewerOpen, setJsonViewerOpen] = useState('none');
    const buttonHandler = () => {
        if (jsonViewerOpen === 'none') {
            setJsonViewerOpen('flex')
        } else if (jsonViewerOpen === 'flex') {
            setJsonViewerOpen('none')
        }
    }

    return (
        <div className="card cardStyle">
            <div className="card-header">
                <div>
                <strong>ID</strong>
                <span> {header}</span>
                </div>
                {mode === 'peekDlq' &&
                    <button className="seeMoreButton btn btn-info" onClick={() => onOpenPublishModal()}>Republish</button>
                }
                <button className="seeMoreButton btn btn-info" onClick={() => buttonHandler()}>Raw Message</button>
            </div>
            <div className="card-body">
            {mode === 'peekDlq' &&
                <div className="cardInfoRow">
                    <strong>Error description: </strong>
                    <span>{errorDescription}</span>
                </div>
                }
                <div className="deliveryAndAttemptCount">
                <div className="cardInfoRow">
                    <strong>{mode === 'peekDlq' ? 'Dead letter reason: ' : 'Delivery Count: '}</strong>
                    <span>{deadLetterReason}</span>
                </div>
                <div className="cardInfoRow">
                    <strong>Attempt count: </strong>
                    <span>{attemptCount}</span>
                </div>
                </div>
                <div className="jsonButtonWrap">
                    <div className="jsonViewerContainer card" style={{ display: jsonViewerOpen }}>
                        <ReactJson src={cardJson} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
