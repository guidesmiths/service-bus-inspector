import { handleActions } from 'redux-actions';
import initialState from './initialState';
import * as content from './actionCreators';

export default handleActions(
  {
    [content.setDlq]: (state, { payload: { content } }) => ({
      ...state,
      dlqList: content,
    }),
    [content.setToasterMessage]: (state, { payload: { message } }) => ({
      ...state,
      toastNotifications: [
        message
      ],
    }),
    [content.resetToasterMessage]: state => ({
      ...state,
      toastNotifications: [],
    }),
    [content.setActive]: (state, { payload: { content } }) => ({
      ...state,
      activeList: content,
    }),
    [content.setTopics]: (state, { payload: { content } }) => ({
      ...state,
      topics: content,
    }),
    [content.setNamespaces]: (state, { payload: { content } }) => ({
      ...state,
      namespaces: content,
    }),
    [content.setConnectionString]: (state, { payload: { content } }) => ({
      ...state,
      connectionString: content,
    }),
    [content.selectNamespace]: (state, { payload: { content } }) => ({
      ...state,
      selectedNamespace: content,
    }),
  },
  initialState,
);