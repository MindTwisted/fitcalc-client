import axios from './axios'
import { getAuthUrl } from './config'
import { AccessToken, User, RefreshToken } from '../types/models'

export const register = ({ 
  name = '', 
  email = '', 
  password = '' 
} = {}): Promise<{
  data: {
    data: {
      user: User
    }
  }
}> => {
  return axios.post(`${getAuthUrl()}/register`, { name, email, password })
}

export const login = ({ 
  email = '', 
  password = '' 
} = {}): Promise<{
  data: {
    message: string
    data: {
      access_token: AccessToken
      refresh_token: RefreshToken
      date: string
    }
  }
}> => {
  return axios.post(`${getAuthUrl()}/login`, { email, password })
}

export const auth = (): Promise<{
  data: {
    data: {
      user: User
    }
  }
}> => {
  return axios.get(`${getAuthUrl()}/`)
}

export const refresh = (refreshToken: RefreshToken): Promise<{
  data: {
    data: {
      access_token: AccessToken
    }
  }
}> => {
  return axios.post(`${getAuthUrl()}/refresh`, { refresh_token: refreshToken.token }, { headers: { noAuth: true } })
}

export const verifyPassword = (password: string): Promise<{
  data: {
    data: {
      message: string
    }
  }
}> => {
  return axios.post(`${getAuthUrl()}/verify_password`, { password })
}