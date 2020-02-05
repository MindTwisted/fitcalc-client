import { store } from '../store';

export const apiRoot = process.env.REACT_APP_API_ROOT;
export const getApiPrefix = () => `${store.getState().system.lang}/api`;