import { SET_LANG, SET_LOADING, SET_THEME, SystemActionTypes, Themes } from './types';
import { Dispatch } from 'redux';

export function setLang(lang: string): SystemActionTypes {
  return {
    type: SET_LANG,
    lang
  };
}

export function setLoading(loading: boolean): SystemActionTypes {
  return {
    type: SET_LOADING,
    loading
  };
}

export function setTheme(theme: Themes): SystemActionTypes {
  return {
    type: SET_THEME,
    theme
  };
}

export function boundSetLang(lang: string): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    localStorage.setItem('lang', lang);

    dispatch(setLang(lang));
  };
}

export function boundSetLoading(loading: boolean): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    dispatch(setLoading(loading));
  };
}

export function boundSetTheme(theme: Themes): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    localStorage.setItem('theme', theme);

    dispatch(setTheme(theme));
  };
}