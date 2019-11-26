import { all, fork, takeLatest } from 'redux-saga/effects';

import contentSagas from './Azure/sagas';
import authSagas from './Auth/sagas'

const sagas = {
  ...contentSagas,
  ...authSagas
};

const watchers = Object.entries(sagas).map(([key, value]) => (
  function* watchSaga() {
    yield takeLatest(key, value);
  }));

export default function* root() {
  yield all(watchers.map(watcher => fork(watcher)));
}
