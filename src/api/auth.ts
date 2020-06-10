import axios from './axios'
import { getAuthUrl } from './config'
import { RefreshToken } from '../types/models'
import { AuthResponse, LoginResponse, RegisterResponse, RefreshResponse, VerifyPasswordResponse } from './responseTypes'

export const register = ({ name = '', email = '', password = '' } = {}): Promise<RegisterResponse> => {
  return axios.post(`${getAuthUrl()}/register`, { name, email, password })
}

export const login = ({ email = '', password = '' } = {}): Promise<LoginResponse> => {
  return axios.post(`${getAuthUrl()}/login`, { email, password })
}

export const auth = (): Promise<AuthResponse> => {
  return axios.get(`${getAuthUrl()}/`)
}

export const refresh = (() => {
  let refreshPromise: Promise<RefreshResponse> | null = null
  
  return (refreshToken: RefreshToken): Promise<RefreshResponse> => {
    if (refreshPromise) {
      return refreshPromise
    }

    refreshPromise = axios.post(
      `${getAuthUrl()}/refresh`,
      { refresh_token: refreshToken.token },
      { headers: { noAuth: true } }
    )
      .then((response) => {
        refreshPromise = null

        return response
      })
      .catch((error) => {
        refreshPromise = null

        return error
      })

    return refreshPromise
  }
})()

export const verifyPassword = (password: string): Promise<VerifyPasswordResponse> => {
  return axios.post(`${getAuthUrl()}/verify_password`, { password })
}