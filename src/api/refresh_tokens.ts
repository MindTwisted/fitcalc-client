import axios from './axios'
import { getRefreshTokensPrefix } from './config'
import { RefreshToken } from '../types/models'

export const deleteRefreshTokenById = (id: number): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.delete(`${getRefreshTokensPrefix()}/${id}`)
}

export const getAllRefreshTokens = (): Promise<{
  data: {
    data: {
      refreshTokens: RefreshToken[]
    }
  }
}> => {
  return axios.get(`${getRefreshTokensPrefix()}`)
}

export const deleteAllRefreshTokens = (): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.delete(`${getRefreshTokensPrefix()}`)
}