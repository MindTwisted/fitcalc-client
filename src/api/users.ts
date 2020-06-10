import axios from './axios'
import { getUsersUrl } from './config'
import {
  ConfirmPasswordRecoveryResponse,
  InitiatePasswordRecoveryResponse,
  UpdateCurrentUserEmailResponse,
  UpdateCurrentUserPasswordResponse,
  UpdateCurrentUserResponse
} from './responseTypes'

export const initiatePasswordRecovery = (email = ''): Promise<InitiatePasswordRecoveryResponse> => {
  return axios.post(`${getUsersUrl()}/initiate_password_recovery`, { email })
}

export const confirmPasswordRecovery = ({ token = '', password = '' } = {}): Promise<ConfirmPasswordRecoveryResponse> => {
  return axios.post(`${getUsersUrl()}/confirm_password_recovery`, { token, password })
}

export const updateCurrentUser = ({ name = '' } = {}): Promise<UpdateCurrentUserResponse> => {
  return axios.put(`${getUsersUrl()}`, { name })
}

export const updateCurrentUserEmail = (
  { currentPassword = '', email = '' } = {}
): Promise<UpdateCurrentUserEmailResponse> => {
  return axios.put(`${getUsersUrl()}/email`, { current_password: currentPassword, email })
}

export const updateCurrentUserPassword = (
  { currentPassword = '', newPassword = '' } = {}
): Promise<UpdateCurrentUserPasswordResponse> => {
  return axios.put(`${getUsersUrl()}/password`, {
    current_password: currentPassword,
    new_password: newPassword
  })
}