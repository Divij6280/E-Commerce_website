export const getApiBaseUrl = () => {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL;
};

const BASE_URL = getApiBaseUrl();


export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const url =  import.meta.env.MODE === 'production'?endpoint:`${BASE_URL}${endpoint}`;
  console.log("url",url,"base",BASE_URL,"END",endpoint)

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
