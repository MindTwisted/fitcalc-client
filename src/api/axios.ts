import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-semantic-toasts';
import { apiRoot } from './config';
import { store } from '../store';
import { boundSetAccessToken, boundSetRefreshToken, boundSetUser } from '../store/auth/actions';
import { refresh } from './auth';

const axiosInstance: any =  axios.create({
  baseURL: apiRoot,
  responseType: 'json'
});

axiosInstance.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    if (config.headers.noAuth) {
      delete config.headers.noAuth;
        
      return config;
    }
      
    const accessToken = store.getState().auth.accessToken;

    if (!accessToken) {
      return config;
    }

    const isAccessTokenValid = Number((new Date(accessToken.expires_at))) > Date.now();

    if (isAccessTokenValid) {
      config.headers.Authorization = `Bearer ${accessToken.token}`;

      return config;
    }
    
    const refreshToken = store.getState().auth.refreshToken;
    
    if (!refreshToken) {
      return config;
    }
    
    const isRefreshTokenValid = Number((new Date(refreshToken.expires_at))) > Date.now();
    
    if (!isRefreshTokenValid) {
      return config;
    }

    try {
      const refreshResponse = await refresh(refreshToken);
      const accessToken = refreshResponse.data.data.access_token;

      boundSetAccessToken(accessToken)(store.dispatch);

      config.headers.Authorization = `Bearer ${accessToken.token}`;

      return config;
    } catch (error) {
      return config;
    }
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

    if (error.response?.status === 401) {
      boundSetAccessToken(null)(store.dispatch);
      boundSetRefreshToken(null)(store.dispatch);
      boundSetUser(null)(store.dispatch);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;