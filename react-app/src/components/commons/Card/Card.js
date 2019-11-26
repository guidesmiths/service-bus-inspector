import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import './Card.css';

const Card = ({ header, errorDescription, deadLetterReason, attemptCount, cardJson, nowIn }) => {
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
                <button className="seeMoreButton btn btn-info" onClick={() => buttonHandler()}>See Raw Message Info</button>
            </div>
            <div className="card-body">
            {nowIn === 'peekdlq' && 
                <div className="cardInfoRow">
                    <strong>Error description: </strong>
                    <span>{errorDescription}</span>
                </div>
                }
                <div className="deliveryAndAttemptCount">
                <div className="cardInfoRow">
                    <strong>{nowIn === 'peekdlq' ? 'Dead letter reason: ' : 'Delivery Count: '}</strong>
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