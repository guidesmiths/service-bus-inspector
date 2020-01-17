import React from 'react';
import './ButtonRow.css';

const ButtonRow = ({ peekMethod, peekDlqMethod, openModal, isLoading, isActive, numOfMessages, totalOfMessages }) => {
	const [msgCount, setMsgCount] = React.useState(numOfMessages);

	React.useEffect(() => {
		setMsgCount(numOfMessages);
	}, [numOfMessages]);

	return (
		<div className="buttonRowContainer">
			<div className="buttonContainer">
				<button type="button btn" className="btn btn-info" disabled={isLoading} onClick={() => peekMethod(msgCount)}>
					{isLoading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>}
					{isActive ? 'Peek Active' : 'Peek DLQ'}
				</button>
				<div className="connectionRow">
					<div className="input-group mb-6">
						<input type="number" min="0" className="form-control" value={msgCount} aria-label="Recipient's username" aria-describedby="button-addon2" name="connectionString" onChange={e => setMsgCount(e.target.value)} />
					</div>
				</div>
			</div>
			<div className="buttonContainer">
				<button type="button btn" className="btn btn-info" disabled={isLoading || totalOfMessages === 0} onClick={() => openModal('deleteActive')}>
					{isLoading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>}
					{totalOfMessages === 0 ? `No Messages to be deleted` : isActive ? `Delete ALL (${totalOfMessages}) Active Mesages` : `Delete ALL (${totalOfMessages}) DLQ Mesages`}
				</button>
			</div>
		</div>
	);
};

export default ButtonRow;
