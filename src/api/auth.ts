import axios from './axios';
import { getApiPrefix } from './config';

const getAuthPrefix = () => `${getApiPrefix()}/auth`;

export const register = ({ name = '', email = '', password = '' } = {}) => {
  return axios.post(`${getAuthPrefix()}/register`, { name, email, password });
};