import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-semantic-toasts';
import { apiRoot } from './config';
import { store } from '../store';
import { boundSetAccessToken, boundSetRefreshToken, boundSetUser } from '../store/auth/actions';

const axiosInstance: any =  axios.create({
  baseURL: apiRoot,
  responseType: 'json'
});

axiosInstance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const accessToken = store.getState().auth.accessToken;
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  }, 
  function (error: AxiosError) {
    return Promise.reject(error);
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

    if (error.response?.status === 403) {
      boundSetAccessToken(null)(store.dispatch);
      boundSetRefreshToken(null)(store.dispatch);
      boundSetUser(null)(store.dispatch);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;