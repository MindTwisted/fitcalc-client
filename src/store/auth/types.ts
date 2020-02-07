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
    accessToken: string | null
    refreshToken: RefreshToken | null
    user: User | null
}

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const SET_USER = 'SET_USER';

interface SetAccessTokenAction {
    type: typeof SET_ACCESS_TOKEN,
    accessToken: string | null
}

interface SetRefreshTokenAction {
    type: typeof SET_REFRESH_TOKEN,
    refreshToken: RefreshToken | null
}

interface SetUserAction {
    type: typeof SET_USER,
    user: User | null
}

export type AuthActionTypes = SetAccessTokenAction | SetRefreshTokenAction | SetUserAction;