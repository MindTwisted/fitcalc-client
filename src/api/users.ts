import axios from './axios'
import { getUsersUrl } from './config'
import { User } from '../types/models'

export const initiatePasswordRecovery = (email = ''): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.post(`${getUsersUrl()}/initiate_password_recovery`, { email })
}

export const confirmPasswordRecovery = ({ token = '', password = '' } = {}): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.post(`${getUsersUrl()}/confirm_password_recovery`, { token, password })
}

export const updateCurrentUser = ({ name = '' } = {}): Promise<{
  data: {
    message: string
    data: {
      user: User
    }
  }
}> => {
  return axios.put(`${getUsersUrl()}`, { name })
}

export const updateCurrentUserEmail = ({ currentPassword = '', email = '' } = {}): Promise<{
  data: {
    message: string
  }
}> => {
  return axios.put(`${getUsersUrl()}/email`, { current_password: currentPassword, email })
}

export const updateCurrentUserPassword = ({ currentPassword = '', newPassword = '' } = {}): Promise<{
  data: {
    message: string
    data: {
      user: User
    }
  }
}> => {
  return axios.put(`${getUsersUrl()}/password`, {
    current_password: currentPassword,
    new_password: newPassword
  })
}