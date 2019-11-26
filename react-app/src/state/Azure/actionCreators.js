import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const getDlq = createAction(
  actionTypes.GET_DLQ,
  content => ({ content }));

export const setDlq = createAction(
  actionTypes.SET_DLQ,
  content => ({ content }),
);

export const deleteDlq = createAction(
  actionTypes.DELETE_DLQ,
  content => ({ content }),
);

export const deleteActive = createAction(
  actionTypes.DELETE_ACTIVE,
  content => ({ content }),
);

export const setToasterMessage = createAction(
  actionTypes.SET_TOASTER_MESSAGE,
  message => ({ message }),
);

export const resetToasterMessage = createAction(
  actionTypes.RESET_TOASTER,
);


export const getActive = createAction(
  actionTypes.GET_ACTIVE,
  content => ({ content })
);

export const setActive = createAction(
  actionTypes.SET_ACTIVE,
  content => ({ content })
);

export const getTopics = createAction(
  actionTypes.GET_TOPICS,
  content => ({ content })
);


export const setTopics = createAction(
  actionTypes.SET_TOPICS,
  content => ({ content })
);

export const getNamespaces = createAction(
  actionTypes.GET_NAMESPACES,
)

export const setNamespaces = createAction(
  actionTypes.SET_NAMESPACES,
  content => ({ content })
);

export const getConnectionString = createAction(
  actionTypes.GET_CONNECTION_STRING,
  content => ({ content })
);

export const setConnectionString = createAction(
  actionTypes.SET_CONNECTION_STRING,
  content => ({ content }),
);

export const selectNamespace = createAction(
  actionTypes.SELECT_NAMESPACE,
  content => ({ content }),
)