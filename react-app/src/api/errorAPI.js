import axios from 'axios';
import { handlingResponse, logError } from './utils';

const sendError = (error, info) => axios.post('/ui/error',
  { error, info })
  .then(handlingResponse([200], 'Error trying to send Error'))
  .catch(logError);

export default sendError;
