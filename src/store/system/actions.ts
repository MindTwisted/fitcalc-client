import { SET_LANG, SET_LOADING, SystemActionTypes } from './types';
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
  }
}

export function boundSetLang(lang: string): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    localStorage.setItem('lang', lang);

    dispatch(setLang(lang));
  }
}

export function boundSetLoading(loading: boolean): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    dispatch(setLoading(loading));
  }
}