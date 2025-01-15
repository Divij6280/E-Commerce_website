import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_PROD || 'http://localhost:5000', // Fallback for development
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors (Optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add an Authorization token if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// Add response interceptors (Optional)
axiosInstance.interceptors.response.use(
  (response) => response.data, // Simplify response
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Reusable API request function
export const apiRequest = async (endpoint, method = 'GET', body = null, headers = {}) => {
  try {
    const options = {
      method,
      url: endpoint, // Endpoint without the base URL
      headers: {
        ...headers, // Custom headers
      },
      ...(body && { data: body }), // Only include 'data' if there's a body
    };

    const response = await axiosInstance(options);
    return response; // Already parsed in the interceptor
  } catch (error) {
    // Handle errors gracefully
    console.error('API request error:', error);
    throw error;
  }
};
