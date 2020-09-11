import React, { useState } from 'react';
import Row from '../Row/Row';
import './Table.css'

const Table = ({ topics, namespace, resourceGroup }) => {
	const [inputValue, setInputValue] = useState('')

	return (
		<table className="tableCondensed" frame="void" rules="rows" style={{ 'borderCollapse': 'collapse' }}>
			<input
				className='input'
				placeholder='Search topics...'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}/>
			<thead>
			<tr className='firstRow'>
				<th className='firstCol tableHeaderTitle'>TOPICS</th>
				<th className='tableHeaderTitle'>ACTIVE MESSAGES</th>
				<th className='tableHeaderTitle'>DLQ MESSAGES</th>
				<th className='tableHeaderTitle titleActions'>ACTIONS</th>
			</tr>
			</thead>
			<tbody>
			{topics.filter(topic => topic.topic.toLowerCase().includes(inputValue.toLowerCase())).map(topic => <Row
				topic={topic}
				className={topic.topic}
				key={topic.topic}
				namespace={namespace}
				resourceGroup={resourceGroup}/>)}
			</tbody>
		</table>
	);
}

export default Table;
