export const getApiBaseUrl = () => {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL;
};

console.log("MODE", import.meta.env.MODE);
const BASE_URL = getApiBaseUrl();

console.log("Base URL", BASE_URL);

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
    options.body = JSON.stringify(body); // Ensure the body is stringified
    options.headers['Content-Type'] = 'application/json'; // Set content type for JSON requests
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
