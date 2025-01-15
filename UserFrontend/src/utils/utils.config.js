import axios from 'axios';



export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const url = `${process.env.REACT_APP_API_BASE_URL_PROD}${endpoint}`;

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
