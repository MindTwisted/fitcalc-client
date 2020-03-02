export interface AccessToken {
    expires_at: string
    token: string
}

export interface RefreshToken {
    expires_at: string
    id: number | null
    token: string
}

export interface User {
    id: number | null
    name: string
    email: string
    roles: string[]
}

export interface AuthState {
    accessToken: AccessToken | null
    refreshToken: RefreshToken | null
    user: User | null,
    timeOffset: number
}

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const SET_USER = 'SET_USER';
export const SET_TIME_OFFSET = 'SET_TIME_OFFSET';

interface SetAccessTokenAction {
    type: typeof SET_ACCESS_TOKEN,
    accessToken: AccessToken | null
}

interface SetRefreshTokenAction {
    type: typeof SET_REFRESH_TOKEN,
    refreshToken: RefreshToken | null
}

interface SetUserAction {
    type: typeof SET_USER,
    user: User | null
}

interface SetTimeOffsetAction {
    type: typeof SET_TIME_OFFSET,
    timeOffset: number
}

export type AuthActionTypes = SetAccessTokenAction | SetRefreshTokenAction | SetUserAction | SetTimeOffsetAction ;