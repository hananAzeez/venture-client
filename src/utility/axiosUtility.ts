import axios from "axios";

// Create an Axios instance with a custom configuration
export const apiInstance = axios.create({
  baseURL: "http://139.59.76.189:4000", // Set your base URL
  headers: {
    "Content-Type": "application/json", // Set the content type as needed
    // Add any other headers you may need
  },
});

// Set the token in the headers for every request made by this instance
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace 'your_token_here' with the actual token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Now you can use apiInstance.post() instead of axios.post() for requests
// const formData = {
//   /* your form data here */
// };

// try {
//   const response = await apiInstance.post("/auth/login", formData);
//   // Handle the response
//   console.log(response.data);
// } catch (error) {
//   // Handle errors
//   console.error(error);
// }
