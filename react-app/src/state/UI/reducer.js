import { handleActions } from 'redux-actions';
import initialState from './initialState';
import * as uiActions from './actionCreators';

export default handleActions(
  {
    [uiActions.setLoading]: (state, { payload: { loading } }) => ({
      ...state,
      isLoading: loading,
    }),

  },
  initialState,
);
