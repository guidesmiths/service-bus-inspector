import { handleActions } from 'redux-actions';
import initialState from './initialState';
import * as content from './actionCreators';

export default handleActions(
  {
    [content.setToasterMessage]: (state, { payload: { message } }) => ({
      ...state,
      toastNotifications: [message]
    }),
    [content.resetToasterMessage]: state => ({
      ...state,
      toastNotifications: []
    }),
    [content.setTopics]: (state, { payload: { content } }) => ({
      ...state,
      topics: content
    }),
    [content.setNamespaces]: (state, { payload: { content } }) => ({
      ...state,
      namespaces: content
    }),
    [content.setBusConnectionParams]: (state, { payload: { content } }) => ({
      ...state,
      busConnectionParams: {
        mode: content.mode,
        namespace: content.namespace,
        subscription: content.subscription.name,
        topic: content.topicNameUnparsed,
        activeCount: content.subscription.properties.countDetails.activeMessageCount,
        dlqCount: content.subscription.properties.countDetails.deadLetterMessageCount
      }
    })
  },
  initialState
);
