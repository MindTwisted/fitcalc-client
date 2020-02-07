import axios from './axios';
import { getApiPrefix } from './config';
import { RefreshToken, User } from '../store/auth/types';

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
      access_token: string,
      refresh_token: RefreshToken
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