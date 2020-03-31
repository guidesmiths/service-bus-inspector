import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const setToasterMessage = createAction(actionTypes.SET_TOASTER_MESSAGE, message => ({ message }));

export const resetToasterMessage = createAction(actionTypes.RESET_TOASTER);

export const getTopics = createAction(actionTypes.GET_TOPICS, content => ({ content }));

export const setTopics = createAction(actionTypes.SET_TOPICS, content => ({ content }));

export const getNamespaces = createAction(actionTypes.GET_NAMESPACES);

export const setNamespaces = createAction(actionTypes.SET_NAMESPACES, content => ({ content }));

export const selectNamespace = createAction(actionTypes.SELECT_NAMESPACE, content => ({ content }));

export const setBusConnectionParams = createAction(actionTypes.SET_BUS_CONNECTION_PARAMS, content => ({ content }));
