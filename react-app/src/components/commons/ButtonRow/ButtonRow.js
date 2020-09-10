import React from 'react';
import './ButtonRow.css';

const ButtonRow = ({ openModal, isLoading, activeCount, dlqCount }) => {

	return (
		<div className="buttonRowContainer">
			<div className="buttonContainer">
				{isLoading && <button type="button btn" className="btn btn-info" disabled={true}><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Loading...</button>}
				{activeCount !== 0 &&
				<button type="button btn" className="btn btn-info" disabled={isLoading || activeCount === 0} onClick={() => openModal('active')}>
					Delete ALL {activeCount} Active Mesages
				</button>
				}
				{dlqCount !== 0 &&
				<button type="button btn" className="btn btn-info" disabled={isLoading || dlqCount === 0} onClick={() => openModal('dlq')}>
					Delete ALL {dlqCount} DLQ Mesages
				</button>
				}
			</div>
		</div>
	);
};

export default ButtonRow;
