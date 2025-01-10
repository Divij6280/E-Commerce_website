import axios from 'axios';

export const getApiBaseUrl = () => {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL;
};

const BASE_URL = getApiBaseUrl();

export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  console.log("url", url, "base", BASE_URL, "END", endpoint);

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
