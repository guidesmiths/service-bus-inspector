import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const setLoading = createAction(
  actionTypes.SET_LOADING,
  loading => ({ loading }),
);

