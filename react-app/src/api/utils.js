import queryString from 'query-string';

export const handlingResponse = (successStatus = [200], errorMessage = 'Error') => ({ status, data }) => {
  if (!successStatus.includes(status)) {
    const error = new Error(errorMessage);
    error.statusCode = status;
    throw error;
  }
  return data;
};

export const logError = error => {
  // Add aplication Insight
  throw error.response.data;
};

export const getCodeFromURL = () => {
  const { code } = queryString.parse(window.location.search);
  return code;
};

export const getEmailFromURL = () => {
  const { email } = queryString.parse(window.location.search);
  return email;
};
