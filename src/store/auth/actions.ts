import {
  AccessToken,
  AuthActionTypes,
  AuthState,
  RefreshToken,
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_USER,
  User
} from './types';
import { Dispatch } from 'redux';
import { RootState } from '../index';
import { boundSetLoading } from '../system/actions';
import { deleteRefreshTokenById } from '../../api/refresh_tokens';
import { SystemActionTypes } from '../system/types';
import { auth, login } from '../../api/auth';

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
  };
}

export function boundSetAccessToken(accessToken: AccessToken | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
    } else {
      localStorage.removeItem('accessToken');
    }

    dispatch(setAccessToken(accessToken));
  };
}

export function boundSetRefreshToken(refreshToken: RefreshToken | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (refreshToken) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    } else {
      localStorage.removeItem('refreshToken');
    }

    dispatch(setRefreshToken(refreshToken));
  };
}

export function boundSetUser(user: User | null): Function {
  return function (dispatch: Dispatch<AuthActionTypes>): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }

    dispatch(setUser(user));
  };
}

export function boundLogin({ email = '', password = '' } = {}): Function {
  return async function (dispatch: Dispatch<AuthActionTypes>): Promise<void> {
    try {
      const loginResponse = await login({ email, password });
      const loginData = loginResponse.data.data;

      boundSetAccessToken(loginData.access_token)(dispatch);
      boundSetRefreshToken(loginData.refresh_token)(dispatch);

      const authResponse = await auth();
      const authData = authResponse.data.data;

      boundSetUser(authData.user)(dispatch);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export function boundLogout(): Function {
  return async function (dispatch: Dispatch<AuthActionTypes | SystemActionTypes>, getState: () => RootState): Promise<void> {
    const { auth }: {auth: AuthState} = getState();

    boundSetLoading(true)(dispatch);

    try {
      if (auth.refreshToken?.id) {
        await deleteRefreshTokenById(auth.refreshToken.id);
      }

      boundSetAccessToken(null)(dispatch);
      boundSetRefreshToken(null)(dispatch);
      boundSetUser(null)(dispatch);
      boundSetLoading(false)(dispatch);
    } catch (error) {
      boundSetLoading(false)(dispatch);
    }
  };
}