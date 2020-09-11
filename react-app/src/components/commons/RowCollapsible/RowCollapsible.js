import React from 'react';
import { withRouter } from 'react-router-dom';
import './RowCollapsible.css';

const RowCollapsible = ({ subscription, topicName, topicNameUnparsed, namespace, history, resourceGroup }) => {
  const onClickSubscription = (subscription, namespace, topicNameUnparsed, resourceGroup) => {
    history.push(`/busconnection/${resourceGroup}/${namespace}/${subscription.name}/${topicNameUnparsed}/`);
  };

  return subscription !== '' ? (
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
            <button className="linkSpan" onClick={() => onClickSubscription(subscription, namespace, topicNameUnparsed, resourceGroup)}>
                <b>See Detail</b>
            </button>
          </div>
        </div>
      </td>
    </tr>
  ) : (
    <tr>
      <td className="hiddenRow" colSpan="4">
        <div className="accordian-body collapse show" id={topicName}>
          <div className="hiddenRowHeight">There are no subscriptions for this topic</div>
        </div>
      </td>
    </tr>
  );
};

export default withRouter(RowCollapsible);
