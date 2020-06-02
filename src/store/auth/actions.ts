import { AuthActionTypes } from './types'
import { Dispatch } from 'redux'
import { RootState } from '../index'
import { AccessToken, RefreshToken, User } from '../../types/models'
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USER, SET_TIME_OFFSET } from '../../types/actionTypes'
import { AuthState } from '../../types/actions'
import { boundSetLoading } from '../system/actions'
import { deleteRefreshTokenById } from '../../api/refresh_tokens'
import { SystemActionTypes } from '../system/types'
import { auth, login } from '../../api/auth'

export function setAccessToken(accessToken: AccessToken | null): AuthActionTypes {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken
  }
}

export function setRefreshToken(refreshToken: RefreshToken | null): AuthActionTypes {
  return {
    type: SET_REFRESH_TOKEN,
    refreshToken
  }
}

export function setUser(user: User | null): AuthActionTypes {
  return {
    type: SET_USER,
    user
  }
}

export function setTimeOffset(timeOffset: number): AuthActionTypes {
  return {
    type: SET_TIME_OFFSET,
    timeOffset
  }
}

export function boundSetAccessToken(accessToken: AccessToken | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken))
    } else {
      localStorage.removeItem('accessToken')
    }

    dispatch(setAccessToken(accessToken))
  }
}

export function boundSetRefreshToken(refreshToken: RefreshToken | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (refreshToken) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
    } else {
      localStorage.removeItem('refreshToken')
    }

    dispatch(setRefreshToken(refreshToken))
  }
}

export function boundSetUser(user: User | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }

    dispatch(setUser(user))
  }
}

export function boundSetTimeOffset(timeOffset: number): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    localStorage.setItem('timeOffset', String(timeOffset))
    
    dispatch(setTimeOffset(timeOffset))
  }
}

export function boundLogin({ email = '', password = '' } = {}): Function {
  return async function (dispatch: Dispatch<AuthActionTypes>): Promise<void> {
    try {
      const loginResponse = await login({ email, password })
      const { access_token, refresh_token, date } = loginResponse.data.data
      const timeOffset = Number(new Date(date)) - Number(new Date())

      boundSetAccessToken(access_token)(dispatch)
      boundSetRefreshToken(refresh_token)(dispatch)
      boundSetTimeOffset(timeOffset)(dispatch)

      const authResponse = await auth()
      const { user } = authResponse.data.data

      boundSetUser(user)(dispatch)

      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export function boundSoftLogout(): Function {
  return async function (dispatch: Dispatch<AuthActionTypes | SystemActionTypes>): Promise<void> {
    boundSetAccessToken(null)(dispatch)
    boundSetRefreshToken(null)(dispatch)
    boundSetUser(null)(dispatch)
    boundSetTimeOffset(0)(dispatch)
  }
}

export function boundLogout(): Function {
  return async function (dispatch: Dispatch<AuthActionTypes | SystemActionTypes>, getState: () => RootState): Promise<void> {
    const { auth }: {auth: AuthState} = getState()

    boundSetLoading(true)(dispatch)

    if (auth.refreshToken?.id) {
      await deleteRefreshTokenById(auth.refreshToken.id)
    }

    boundSoftLogout()(dispatch)
    boundSetLoading(false)(dispatch)
  }
}