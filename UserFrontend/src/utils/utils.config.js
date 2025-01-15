import axios from 'axios';

export const getApiBaseUrl = () => {
  return process.env.MODE === 'production'
    ? process.env.REACT_APP_API_BASE_URL_PROD
    : process.env.REACT_APP_API_BASE_URL;
};

const BASE_URL = getApiBaseUrl();

export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  console.log("url", url, "base", BASE_URL, "END", endpoint);
  console.log("MODE", process.env.MODE)

  const defaultHeaders = {
    Accept: 'application/json',
    ...headers,
  };

  const options = {
    method,
    url,
    headers: defaultHeaders,
  };

  if (body) {
    options.data = body;  // Axios uses 'data' instead of 'body' for POST/PUT requests
  }

  try {
    const response = await axios(options);
    return response.data; // Axios automatically parses the JSON for you
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
