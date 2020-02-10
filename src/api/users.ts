import axios from './axios';
import { getApiPrefix } from './config';

const getUsersPrefix = () => `${getApiPrefix()}/users`;

export const initiatePasswordReset = (email = ''): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.post(`${getUsersPrefix()}/initiate_password_reset`, { email });
};

export const confirmPasswordReset = ({ token = '', password = '' } = {}): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.post(`${getUsersPrefix()}/confirm_password_reset`, { token, password });
};