import axios from './axios'
import { getRefreshTokensUrl } from './config'
import {
  DeleteAllRefreshTokensResponse,
  DeleteRefreshTokenByIdResponse,
  GetAllRefreshTokensResponse
} from './responseTypes'

export const deleteRefreshTokenById = (id: number): Promise<DeleteRefreshTokenByIdResponse> => {
  return axios.delete(`${getRefreshTokensUrl()}/${id}`)
}

export const getAllRefreshTokens = (): Promise<GetAllRefreshTokensResponse> => {
  return axios.get(`${getRefreshTokensUrl()}`)
}

export const deleteAllRefreshTokens = (): Promise<DeleteAllRefreshTokensResponse> => {
  return axios.delete(`${getRefreshTokensUrl()}`)
}