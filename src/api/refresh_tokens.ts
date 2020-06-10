import axios from './axios'
import { getRefreshTokensUrl } from './config'
import { RefreshToken } from '../types/models'

export const deleteRefreshTokenById = (id: number): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.delete(`${getRefreshTokensUrl()}/${id}`)
}

export const getAllRefreshTokens = (): Promise<{
  data: {
    data: {
      refreshTokens: RefreshToken[]
    }
  }
}> => {
  return axios.get(`${getRefreshTokensUrl()}`)
}

export const deleteAllRefreshTokens = (): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.delete(`${getRefreshTokensUrl()}`)
}