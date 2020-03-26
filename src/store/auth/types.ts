import { AccessToken, RefreshToken, User } from '../../types/models';
import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USER, SET_TIME_OFFSET } from '../../types/actionTypes';

export interface AuthState {
    accessToken: AccessToken | null;
    refreshToken: RefreshToken | null;
    user: User | null;
    timeOffset: number;
}

interface SetAccessTokenAction {
    type: typeof SET_ACCESS_TOKEN;
    accessToken: AccessToken | null;
}

interface SetRefreshTokenAction {
    type: typeof SET_REFRESH_TOKEN;
    refreshToken: RefreshToken | null;
}

interface SetUserAction {
    type: typeof SET_USER;
    user: User | null;
}

interface SetTimeOffsetAction {
    type: typeof SET_TIME_OFFSET;
    timeOffset: number;
}

export type AuthActionTypes = SetAccessTokenAction | SetRefreshTokenAction | SetUserAction | SetTimeOffsetAction ;