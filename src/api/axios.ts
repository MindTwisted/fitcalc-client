import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-semantic-toasts';
import { apiRoot } from './config';

const axiosInstance: any =  axios.create({
  baseURL: apiRoot,
  responseType: 'json'
});

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.data.message) {
      toast({
        type: 'success',
        title: response.data.message,
        time: 3000
      });
    }

    return response;
  }, 
  function (error: AxiosError) {
    if (error.response?.data?.message) {
      toast({
        type: 'error',
        title: error.response.data.message,
        time: 3000
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;