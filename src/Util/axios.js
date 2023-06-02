import axios from "axios";
import { connection_string } from "./connection_strings";
import { getAccessToken, removeAccessToken } from "./authHeader";
window.axios = axios;
axios.defaults.baseURL = connection_string;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      console.log("token", token);
      config.headers["Authorization"] =  token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


// Adds a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      removeAccessToken();
      // router.push({name : 'auth.login'});
    }
    return Promise.reject(error);
  }
);

export default axios;
