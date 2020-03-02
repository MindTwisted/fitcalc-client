import axios from './axios';
import { getApiPrefix } from './config';
import { AccessToken, RefreshToken, User } from '../store/auth/types';

const getAuthPrefix = () => `${getApiPrefix()}/auth`;

export const register = ({ 
  name = '', 
  email = '', 
  password = '' 
} = {}): Promise<{
  data: {
    data: {
      user: User
    }
  }
}> => {
  return axios.post(`${getAuthPrefix()}/register`, { name, email, password });
};

export const login = ({ 
  email = '', 
  password = '' 
} = {}): Promise<{
  data: {
    message: string,
    data: {
      access_token: AccessToken,
      refresh_token: RefreshToken,
      date: string
    }
  }
}> => {
  return axios.post(`${getAuthPrefix()}/login`, { email, password });
};

export const auth = (): Promise<{
  data: {
    data: {
      user: User
    }
  }
}> => {
  return axios.get(`${getAuthPrefix()}/`);
};

export const refresh = (refreshToken: RefreshToken): Promise<{
  data: {
    data: {
      access_token: AccessToken
    }
  }
}> => {
  return axios.post(`${getAuthPrefix()}/refresh`, { refresh_token: refreshToken.token }, { headers: { noAuth: true } });
};