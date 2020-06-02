import { createSelector } from 'reselect'
import { RootState } from '..'

const getAccessToken = (state: RootState) => state.auth.accessToken
const getRefreshToken = (state: RootState) => state.auth.refreshToken
const getUser = (state: RootState) => state.auth.user

export const isLoggedInSelector = createSelector(
  [getAccessToken, getRefreshToken, getUser],
  (accessToken, refreshToken, user) => 
    Boolean(accessToken && refreshToken && user)
)

export const isAppUserSelector = createSelector(
  [getUser],
  (user) =>
    Boolean(user?.roles.includes('ROLE_APP_USER'))
)