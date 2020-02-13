import axios from './axios';
import { getApiPrefix } from './config';

const getRefreshTokensPrefix = () => `${getApiPrefix()}/refresh_tokens`;

export const deleteRefreshTokenById = (id: number): Promise<{
    data: {
        message: string
    }
}> => {
  return axios.delete(`${getRefreshTokensPrefix()}/${id}`);
};