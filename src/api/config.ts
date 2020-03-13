import { store } from '../store';

export const apiRoot = process.env.REACT_APP_API_ROOT;

export const getApiPrefix = () => `${store.getState().system.lang}/api`;
export const getAuthPrefix = () => `${getApiPrefix()}/auth`;
export const getRefreshTokensPrefix = () => `${getApiPrefix()}/refresh_tokens`;
export const getUsersPrefix = () => `${getApiPrefix()}/users`;
export const getProductsPrefix = () => `${getApiPrefix()}/products`;