import axios from 'axios';
import { handlingResponse, logError } from './utils';

export const getDlq = (params) => axios({
  method: 'post',
  url: 'http://localhost:4000/peekdlq',
  headers: {
    Authorization: localStorage.getItem('token'),
  },
  data: {
    topic: params.payload.content.topic,
    subscription: params.payload.content.sub,
    numMessages: params.payload.content.numDlq,
  }
})
  .then(handlingResponse([200], 'Error trying to get content'))
  .catch(logError);

export const deleteDlq = (params) => axios({
  method: 'post',
  url: 'http://localhost:4000/processdlq',
  headers: {
    Authorization: localStorage.getItem('token'),
  },
  data: {
    topic: params.payload.content.topic,
    subscription: params.payload.content.sub,
  }
})
  .then(handlingResponse([200], 'Error trying to get content'))
  .catch(logError);

export const deleteActive = (params) => axios({
  method: 'post',
  url: 'http://localhost:4000/deleteActive',
  headers: {
    Authorization: localStorage.getItem('token'),
  },
  data: {
    topic: params.payload.content.topic,
    subscription: params.payload.content.sub,
  }
})
  .then(handlingResponse([200], 'Error trying to get content'))
  .catch(logError);

export const getActive = (params) => axios({
  method: 'post',
  url: 'http://localhost:4000/peekactive',
  headers: {
    Authorization: localStorage.getItem('token'),
  },
  data: {
    nameSpace: params.payload.content.nameSpace,
    topic: params.payload.content.topic,
    subscription: params.payload.content.sub,
    numMessages: params.payload.content.numActive,
  }
})
  .then(handlingResponse([200], 'Error trying to get content'))
  .catch(logError);

export const getToken = (credentials) => axios({
  method: 'post',
  url: 'http://localhost:4000/auth',
  headers: {},
  data: {
    clientId: credentials.payload.clientId,
    clientSecret: credentials.payload.clientSecret,
    appTenantId: credentials.payload.appTenantId,
    subscriptionId: credentials.payload.subscriptionId
  }
})
  .then(handlingResponse([200], 'Error trying to get content'))
  .catch(logError);

export const getNamespaces = (token) => axios({
  method: 'get',
  url: 'http://localhost:4000/namespaces',
  headers: { 
    Authorization: localStorage.getItem('token'),
   },
  data: {}
}) 

export const getTopics = (body) => axios({
  method: 'post',
  url: 'http://localhost:4000/namespace',
  headers: {
    Authorization: localStorage.getItem('token'),
   },
  data: body
})
  .then(handlingResponse([200], 'Error trying to get content'))
  .catch(logError);

export const tokenHealth = (token) => axios({
  method: 'get',
  url: 'http://localhost:4000/tokenhealth',
  headers: {
    Authorization: token,
   },
})
