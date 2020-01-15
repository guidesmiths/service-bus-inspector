import { put, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as azureActions from './actionCreators';
import * as uiActions from '../UI/actionCreators'
import { content as contentAPI } from '../../api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

function* getDlqSaga(params) {
  try {
    const content = yield contentAPI.getDlq(params);
    if (content.length === 0) {
      yield put(azureActions.setToasterMessage({ id: '', message: 'There are no messages in DLQ', action: 'Empty DLQ' }))
    } else {
      yield put(azureActions.setDlq(content));
    }
  } catch (error) {
    yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error Getting DLQ' }))
  }
  finally {
    yield put(uiActions.setLoading(false));
  }
}

function* deleteDlqSaga(params) {
  try {
    yield call(contentAPI.deleteDlq, params)
    yield put(azureActions.setToasterMessage({ message: 'Deleted active properly', action: 'Deleting DLQ' }))
    yield window.location.reload()
  } catch (error) {
    yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error Deleting DLQ' }))
  }
  finally {
    yield put(uiActions.setLoading(false));
  }
}

function* deleteActiveSaga(params) {
  try {
    const result = yield call(contentAPI.deleteActive, params)
    yield put(azureActions.setToasterMessage({ message: 'Deleted active properly', action: result }))
    yield window.location.reload()
  } catch (error) {
    yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error Deleting Active Messages' }))
  }
  finally {
    yield put(uiActions.setLoading(false));
  }
}

function* getActiveSaga(params) {
  try {
    const content = yield contentAPI.getActive(params);
    if (content.length === 0) {
      yield put(azureActions.setToasterMessage({ message: 'There are no Active Messages', action: 'Empty active queue' }))
    } else {
      yield put(azureActions.setActive(content));
    }
  } catch (error) {
    yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error Getting Active Messages' }))
  }
  finally {
    yield put(uiActions.setLoading(false));
  }
}

function* getTopicsSaga(namespace) {
  const body = {
    "namespace": namespace.payload.content.namespace,
    "resourceGroup": namespace.payload.content.resourceGroup,
  }
  try {
    yield put(showLoading());
    const content = yield contentAPI.getTopics(body);
    yield put(azureActions.setTopics(content));
  } catch (error) {
    yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error Getting Topics' }));
  }
  finally {
    yield put(uiActions.setLoading(false));
    yield put(hideLoading())
  }
}

function* getNamespacesSaga() {
  try {
    const token = yield localStorage.getItem('token');
    const namespaces = yield contentAPI.getNamespaces(token);
    yield put(azureActions.setNamespaces(namespaces.data));
  } catch (error) {
    yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error Getting Namespaces' }));
  }
}

export default {
  [actionTypes.GET_DLQ]: getDlqSaga,
  [actionTypes.DELETE_DLQ]: deleteDlqSaga,
  [actionTypes.GET_ACTIVE]: getActiveSaga,
  [actionTypes.GET_TOPICS]: getTopicsSaga,
  [actionTypes.DELETE_ACTIVE]: deleteActiveSaga,
  [actionTypes.GET_NAMESPACES]: getNamespacesSaga,
};
