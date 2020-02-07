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

const getInitialAccessToken = (): AccessToken | null => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return null;
  }

  try {
    return JSON.parse(accessToken);
  } catch (error) {
    return null;
  }
};

const getInitialRefreshToken = (): RefreshToken | null => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return null;
  }

  try {
    return JSON.parse(refreshToken);
  } catch (error) {
    return null;
  }
};

const getInitialUser = (): User | null => {
  const user = localStorage.getItem('user');

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    return null;
  }

};

const initialState: AuthState = {
  accessToken: getInitialAccessToken(),
  refreshToken: getInitialRefreshToken(),
  user: getInitialUser()
};

export function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.refreshToken
      };
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}