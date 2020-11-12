import axios from 'axios';
import { handlingResponse, logError } from './utils';

export const azureLogin = async () => {
  window.location.replace('/login-azure');
};

export const getDlq = ({ topic, subscription, numMessages }) =>
  axios({
    method: 'post',
    url: '/peekdlq',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    data: {
      topic,
      subscription,
      numMessages
    }
  })
    .then(handlingResponse([200], 'Error trying to get content'))
    .catch(logError);

export const deleteDlq = (topic, subscription) =>
  axios({
    method: 'post',
    url: '/processdlq',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    data: {
      topic,
      subscription
    }
  })
    .then(handlingResponse([200], 'Error trying to get content'))
    .catch(logError);

export const deleteActive = (topic, subscription) =>
  axios({
    method: 'post',
    url: '/deleteActive',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    data: {
      topic,
      subscription
    }
  })
    .then(handlingResponse([200], 'Error trying to get content'))
    .catch(logError);

export const getActive = ({ namespace, topic, subscription, numMessages }) =>
  axios({
    method: 'post',
    url: '/peekactive',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    data: {
      nameSpace: namespace,
      topic,
      subscription,
      numMessages
    }
  })
    .then(handlingResponse([200], 'Error trying to get content'))
    .catch(logError);

export const getToken = () =>
  axios({
    method: 'post',
    url: '/auth',
    headers: {},
    data: {}
  })
    .then(handlingResponse([200], 'Error trying to get content'))
    .catch(logError);

export const getNamespaces = async () => {
  const response = await axios({
    method: 'get',
    url: '/namespaces',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    data: {}
  });
  return response;
};

export const getTopics = body =>
  axios({
    method: 'post',
    url: '/namespace',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    data: body
  })
    .then(handlingResponse([200], 'Error trying to get content'))
    .catch(logError);

export const getSubscriptionDetail = async body => {
  const response = await axios({
    method: 'post',
    url: '/subscription-detail',
    headers: {
        Authorization: localStorage.getItem('token')
    },
    data: body
  });
  return response;
};

export const checkToken = async () => {
  const response = await axios({
    method: 'get',
    url: '/tokenhealth',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
  return response.data;
};
