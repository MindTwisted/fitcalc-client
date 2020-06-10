import { store } from '../store'

export const apiRoot = process.env.REACT_APP_API_ROOT
export const getApiUrl = () => `${store.getState().system.lang}/api`
export const getAuthUrl = () => `${getApiUrl()}/auth`
export const getRefreshTokensUrl = () => `${getApiUrl()}/refresh_tokens`
export const getUsersUrl = () => `${getApiUrl()}/users`
export const getProductsUrl = () => `${getApiUrl()}/products`