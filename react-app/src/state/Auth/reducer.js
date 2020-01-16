import { handleActions } from 'redux-actions';
import initialState from './initialState';
import * as authActions from './actionCreators';

export default handleActions(
  {
    [authActions.checkToken]: state => ({
      ...state,
      isCheckingToken: true
    }),
    [authActions.setTokenValidity]: (state, { payload: isValid }) => ({
      ...state,
      hasValidToken: isValid,
      isCheckingToken: false
    })
  },
  initialState
);
