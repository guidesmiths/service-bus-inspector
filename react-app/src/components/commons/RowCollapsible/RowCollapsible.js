import React from 'react';
import { Link } from 'react-router-dom';
import './RowCollapsible.css'

const RowCollapsible = ({ subscription, topicName, topicNameUnparsed, namespace }) =>
    subscription !== "" ?
        (
            <tr>
                <td className="hiddenRow">
                    <div className="accordian-body collapse show" id={topicName}>
                        <div className="hiddenRowHeight">{subscription.name}</div>
                    </div>
                </td>
                <td className="hiddenRow activeMessageCount">
                    <div className="accordian-body collapse show" id={topicName}>
                        <div className="accordian-body collapse show activeMessages" id={topicName}>
                            {subscription.properties.countDetails.activeMessageCount}
                        </div>
                    </div>
                </td>
                <td className="hiddenRow deadLetterCount">
                    <div className="accordian-body collapse show" id={topicName}>
                        {subscription.properties.countDetails.deadLetterMessageCount}
                    </div>
                </td>
                <td className="hiddenRow">
                    <div className="accordian-body collapse show" id={topicName}>
                        <div className="iconContainer">

                            <Link className="linkSpan"
                                to={{
                                    pathname: `/busconnection/peekactive/${subscription.properties.countDetails.activeMessageCount}/${namespace}/${topicNameUnparsed}/${subscription.name}`
                                }}>
                                <span>Read Active</span>
                            </Link>
                            <Link className="linkSpan"
                                to={{
                                    pathname: `/busconnection/peekdlq/${subscription.properties.countDetails.deadLetterMessageCount}/${namespace}/${topicNameUnparsed}/${subscription.name}`,
                                }}>
                                <span>Read DLQ</span>
                            </Link>
                        </div>
                    </div>
                </td>
            </tr>
        ) : <tr>
            <td className="hiddenRow" colSpan="4">
                <div className="accordian-body collapse show" id={topicName}>
                    <div className="hiddenRowHeight">There are no subscriptions for this topic</div>
                </div>
            </td>
        </tr>


export default RowCollapsible;