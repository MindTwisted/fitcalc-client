import axios from './axios';
import { getUsersPrefix } from './config';
import { User } from '../store/auth/types';

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

export const updateCurrentUser = ({ name = '' } = {}): Promise<{
  data: {
    message: string,
    data: {
      user: User
    }
  }
}> => {
  return axios.put(`${getUsersPrefix()}`, { name });
};

export const updateCurrentUserEmail = ({ currentPassword = '', email = '' } = {}): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.put(`${getUsersPrefix()}/email`, { current_password: currentPassword, email });
};

export const updateCurrentUserPassword = ({ currentPassword = '', newPassword = '' } = {}): Promise<{
  data: {
    message: string,
    data: {
      user: User
    }
  }
}> => {
  return axios.put(`${getUsersPrefix()}/password`, {
    current_password: currentPassword,
    new_password: newPassword
  });
};