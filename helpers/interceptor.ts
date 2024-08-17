import axios from "axios";

export const setupAxiosInterceptors = (token: string, onTokenExpired: () => void) => {
  // Set the Authorization header for all requests
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Return the response if it's successful
      return response;
    },
    (error) => {
      // Check if the error response is 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        // Token has expired or is invalid
        onTokenExpired();
      }
      return Promise.reject(error);
    }
  );
};
