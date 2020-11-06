import React from 'react';
import RowCollapsible from '../RowCollapsible/RowCollapsible';
import './Row.css';

const Row = ({ topic, namespace, resourceGroup }) => (
    <>
        <tr
            data-toggle="collapse"
            data-target={`#${topic.topic.split('.').join('')}`}
            className="accordion-toggle customRow"
            style={{ 'cursor': 'pointer' }}
        >
            <td className="firstRow">
                <strong> {topic.topic} </strong>
<span className="count-subs-circle">{topic.subsCount}</span>
            </td>
            <td>
            </td>
            <td colSpan="2">
                <div>
                </div>
            </td>
        </tr>
        {
            topic.subscriptions.length !== 0 ?
                topic.subscriptions.map((subscription, index) => (
                    <RowCollapsible
                        subscription={subscription}
                        topicName={topic.topic.split('.').join('')}
                        topicNameUnparsed={topic.topic}
                        key={`${topic.topic}-${index}`}
                        namespace={namespace}
                        resourceGroup={resourceGroup}
                    />
                )) : <RowCollapsible
                    subscription=""
                    topicName={topic.topic.split('.').join('')}
                    key={topic.topic}
                    topicNameUnparsed={topic.topic}
                    namespace={namespace}
                    resourceGroup={resourceGroup}
                />
        }
    </>
);

export default Row;
