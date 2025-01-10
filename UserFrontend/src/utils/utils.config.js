
export const getApiBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_BASE_URL_PROD
    : process.env.REACT_APP_API_BASE_URL;
}

const BASE_URL = getApiBaseUrl();
console.log("base url",BASE_URL)
export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    Accept: 'application/json',
    ...headers,
  };

  const options = {
    method,
    headers: defaultHeaders,
  };

  if (body) {
    options.body = body;
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
