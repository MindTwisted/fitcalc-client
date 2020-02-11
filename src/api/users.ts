import axios from './axios';
import { getApiPrefix } from './config';

const getUsersPrefix = () => `${getApiPrefix()}/users`;

export const initiatePasswordRecovery = (email = ''): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.post(`${getUsersPrefix()}/initiate_password_recovery`, { email });
};

export const confirmPasswordRecovery = ({ token = '', password = '' } = {}): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.post(`${getUsersPrefix()}/confirm_password_recovery`, { token, password });
};