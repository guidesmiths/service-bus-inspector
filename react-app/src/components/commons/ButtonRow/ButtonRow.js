import React from 'react';
import './ButtonRow.css'

const ButtonRow = ({
    peekActiveMethod,
    peekDlqMethod,
    openModal,
    isLoading,
    numActiveMessage,
    numDlqMessage,
    isActive,
    activeMessages,
    dlqMessages,
}) => {
    const handleNumActiveMessage = (event) => numActiveMessage(event.target.value)
    const handleNumDlqMessage = (event) => numDlqMessage(event.target.value)

    return (
        <div className="buttonRowContainer">
            {isActive === true ? <>
                <div className="buttonContainer">
                    <button
                        type="button btn"
                        className="btn btn-info"
                        disabled={isLoading}
                        onClick={() => peekActiveMethod()}>
                        {isLoading &&
                            < span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true">
                            </span>
                        }
                        Peek Active
                    </button>
                    <div className="connectionRow">
                        <div className="input-group mb-6">
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                placeholder={activeMessages}
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                name="connectionString"
                                onChange={handleNumActiveMessage}
                            />
                        </div>
                    </div>
                </div>
                <div className="buttonContainer">
                    <button
                        type="button btn"
                        className="btn btn-info"
                        disabled={isLoading}
                        onClick={() => openModal('deleteActive')}>
                        {isLoading &&
                            <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true">
                            </span>
                        }
                        {`Delete ${activeMessages} Active Mesages`}
                    </button>

                </div>
            </>
                : <>
                    <div className="buttonContainer">
                        <button
                            type="button btn"
                            className="btn btn-info"
                            disabled={isLoading}
                            onClick={() => peekDlqMethod()}>
                            {isLoading &&
                                < span
                                    className="spinner-grow spinner-grow-sm"
                                    role="status"
                                    aria-hidden="true">
                                </span>
                            }
                            Peek DLQ
                        </button>
                        <div className="connectionRow">
                            <div className="input-group mb-6">
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    placeholder={dlqMessages}
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                    name="connectionString"
                                    onChange={handleNumDlqMessage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <button
                            type="button btn"
                            className="btn btn-info"
                            disabled={isLoading}
                            onClick={() => openModal('deletedlq')}>
                            {isLoading &&
                                <span
                                    className="spinner-grow spinner-grow-sm"
                                    role="status"
                                    aria-hidden="true">
                                </span>
                            }
                            {`Delete ${dlqMessages} DLQ Mesages`}
                        </button>
                    </div>

                </>
            }
        </div >
    )
}

export default ButtonRow;
