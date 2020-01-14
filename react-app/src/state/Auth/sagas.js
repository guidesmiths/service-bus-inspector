import { put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as azureActions from '../Azure/actionCreators';
import * as authActions from './actionCreators';
import { content as contentAPI } from '../../api';

function* signInSaga(credentials) {
  try {
    const { token } = yield contentAPI.getToken(credentials);
    localStorage.setItem('token', token);
    yield put(authActions.checkToken());
    yield put(azureActions.setToasterMessage({ message: 'Logged in successfully', action: 'Log in' }));
  } catch (error) {
    yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error signing in' }));
  }
}

function* checkTokenSaga() {
  try {
    const isValid = yield contentAPI.checkToken();
    yield put(authActions.setTokenValidity(isValid));
  } catch (error) {
    yield put(authActions.setTokenValidity(false));
  }
}

export default {
  [actionTypes.SIGN_IN]: signInSaga,
  [actionTypes.CHECK_TOKEN]: checkTokenSaga
};
