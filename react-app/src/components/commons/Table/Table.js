import React from 'react';
import Row from '../Row/Row';
import './Table.css'

const Table = ({ topics, namespace }) => (
    <table className="tableCondensed" frame="void" rules="rows" style={{ 'borderCollapse': 'collapse' }}>
        <thead>
            <tr className='firstRow'>
                <th className='firstCol tableHeaderTitle'>TOPICS</th>
                <th className='tableHeaderTitle'>ACTIVE MESSAGES</th>
                <th className='tableHeaderTitle'>DLQ MESSAGES</th>
                <th className='tableHeaderTitle titleActions'>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            {topics.map(topic => <Row topic={topic} className={topic.topic} key={topic.topic} namespace={namespace} />)}
        </tbody>
    </table>
);

export default Table;