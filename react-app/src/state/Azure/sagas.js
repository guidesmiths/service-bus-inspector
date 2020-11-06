import { put } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as azureActions from './actionCreators';
import * as uiActions from '../UI/actionCreators';
import { content as contentAPI } from '../../api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

function* getTopicsSaga(namespace) {
	const body = {
		namespace: namespace.payload.content.namespace,
		resourceGroup: namespace.payload.content.resourceGroup
	};
	try {
		yield put(showLoading());
		const content = yield contentAPI.getTopicsData(body);
		yield put(azureActions.setTopics(content));
	} catch (error) {
		yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error Getting Topics' }));
	} finally {
		yield put(uiActions.setLoading(false));
		yield put(hideLoading());
	}
}

function* getNamespacesSaga() {
	try {
		const token = localStorage.getItem('token');
		const namespaces = yield contentAPI.getNamespaces(token);
		yield put(azureActions.setNamespaces(namespaces.data));
	} catch (error) {
		yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error Getting Namespaces' }));
	}
}

export default {
	[actionTypes.GET_TOPICS]: getTopicsSaga,
	[actionTypes.GET_NAMESPACES]: getNamespacesSaga
};
