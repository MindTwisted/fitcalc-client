import axios from './axios';
import { getRefreshTokensPrefix } from './config';

export interface RefreshTokensResponse {
  id: number
  device: string
  expires_at: string
}

export const deleteRefreshTokenById = (id: number): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.delete(`${getRefreshTokensPrefix()}/${id}`);
};

export const getAllRefreshTokens = (): Promise<{
  data: {
    data: {
      refreshTokens: RefreshTokensResponse[]
    }
  }
}> => {
  return axios.get(`${getRefreshTokensPrefix()}`);
};

export const deleteAllRefreshTokens = (): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.delete(`${getRefreshTokensPrefix()}`);
};