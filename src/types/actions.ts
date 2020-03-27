import { AccessToken, Languages, Product, RefreshToken, Themes, User } from './models';
import {
  APPEND_PRODUCTS,
  RESET_OFFSET,
  RESET_SEARCH,
  SET_ACCESS_TOKEN,
  SET_LANG,
  SET_LOADING,
  SET_NAME_ERROR,
  SET_NAME_VALUE,
  SET_OFFSET_DONE,
  SET_OFFSET_VALUE,
  SET_PRODUCTS,
  SET_REFRESH_TOKEN,
  SET_SEARCH,
  SET_THEME,
  SET_TIME_OFFSET,
  SET_USER,
  UPDATE_PRODUCT,
  SET_EMAIL_VALUE,
  SET_EMAIL_ERROR,
  SET_PASSWORD_VALUE,
  SET_PASSWORD_ERROR, RESET_FORM
} from './actionTypes';

export interface SystemState {
  lang: Languages;
  loading: boolean;
  theme: Themes;
}

export interface SetLangAction {
  type: typeof SET_LANG;
  lang: Languages;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  loading: boolean;
}

export interface SetThemeAction {
  type: typeof SET_THEME;
  theme: Themes;
}

export interface AuthState {
  accessToken: AccessToken | null;
  refreshToken: RefreshToken | null;
  user: User | null;
  timeOffset: number;
}

export interface SetAccessTokenAction {
  type: typeof SET_ACCESS_TOKEN;
  accessToken: AccessToken | null;
}

export interface SetRefreshTokenAction {
  type: typeof SET_REFRESH_TOKEN;
  refreshToken: RefreshToken | null;
}

export interface SetUserAction {
  type: typeof SET_USER;
  user: User | null;
}

export interface SetTimeOffsetAction {
  type: typeof SET_TIME_OFFSET;
  timeOffset: number;
}

export interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  products: Product[];
}

export interface AppendProductsAction {
  type: typeof APPEND_PRODUCTS;
  products: Product[];
}

export interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  product: Product;
}

export interface SetSearchAction {
  type: typeof SET_SEARCH;
  search: string;
}

export interface ResetSearchAction {
  type: typeof RESET_SEARCH;
}

export interface SetOffsetValueAction {
  type: typeof SET_OFFSET_VALUE;
  value: number;
}

export interface SetOffsetDoneAction {
  type: typeof SET_OFFSET_DONE;
  done: boolean;
}

export interface ResetOffsetAction {
  type: typeof RESET_OFFSET;
}

export interface SetNameValueAction {
  type: typeof SET_NAME_VALUE;
  value: string;
}

export interface SetNameErrorAction {
  type: typeof SET_NAME_ERROR;
  error: string;
}

export interface SetEmailValueAction {
  type: typeof SET_EMAIL_VALUE;
  value: string;
}

export interface SetEmailErrorAction {
  type: typeof SET_EMAIL_ERROR;
  error: string;
}

export interface SetPasswordValueAction {
  type: typeof SET_PASSWORD_VALUE;
  value: string;
}

export interface SetPasswordErrorAction {
  type: typeof SET_PASSWORD_ERROR;
  error: string;
}

export interface ResetFormAction {
  type: typeof RESET_FORM;
}