import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const signIn = createAction(
  actionTypes.SIGN_IN,
  (clientId, clientSecret, appTenantId, subscriptionId) => ({ clientId, clientSecret, appTenantId, subscriptionId }));  

