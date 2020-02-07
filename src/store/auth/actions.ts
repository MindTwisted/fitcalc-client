import { AccessToken, AuthActionTypes, RefreshToken, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USER, User } from './types';
import { Dispatch } from 'redux';

export function setAccessToken(accessToken: AccessToken | null): AuthActionTypes {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken
  };
}

export function setRefreshToken(refreshToken: RefreshToken | null): AuthActionTypes {
  return {
    type: SET_REFRESH_TOKEN,
    refreshToken
  };
}

export function setUser(user: User | null): AuthActionTypes {
  return {
    type: SET_USER,
    user
  }
}

export function boundSetAccessToken(accessToken: AccessToken | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
    } else {
      localStorage.removeItem('accessToken');
    }

    dispatch(setAccessToken(accessToken));
  }
}

export function boundSetRefreshToken(refreshToken: RefreshToken | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (refreshToken) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    } else {
      localStorage.removeItem('refreshToken');
    }

    dispatch(setRefreshToken(refreshToken));
  }
}

export function boundSetUser(user: User | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }

    dispatch(setUser(user));
  }
}