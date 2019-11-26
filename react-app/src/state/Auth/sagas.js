import { put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as azureActions from '../Azure/actionCreators';
import { content as contentAPI } from '../../api';

function* signInSaga(credentials) {
  try {
    const { token } = yield contentAPI.getToken(credentials);
    yield put(azureActions.setToasterMessage({ message: 'Logged in successfully', action: 'Log in' }));
    localStorage.setItem('token', token);
  } catch (error) {
    yield put(azureActions.setToasterMessage({ message: error.message, action: 'Error signing in' }));
  }
}

export default {
  [actionTypes.SIGN_IN]: signInSaga,
};
