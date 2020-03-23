import i18n from '../../localization/i18n';
import { Dispatch } from 'redux';
import { Languages, Themes } from '../../types/models';
import { SET_LANG, SET_LOADING, SET_THEME } from '../../types/actionTypes';
import { SystemActionTypes } from './types';

export function setLang(lang: Languages): SystemActionTypes {
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

export function boundSetLang(lang: Languages): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    localStorage.setItem('lang', lang);

    i18n.changeLanguage(lang);

    dispatch(setLang(lang));
  };
}

const loadingQueue: number[] = [];

export function boundSetLoading(loading: boolean): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    if (loading) {
      loadingQueue.push(1);
  
      dispatch(setLoading(loading));
      
      return;
    }
    
    loadingQueue.shift();
    
    if (!loadingQueue.length) {
      dispatch(setLoading(loading));
    }
  };
}

export function boundSetTheme(theme: Themes): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    localStorage.setItem('theme', theme);

    dispatch(setTheme(theme));
  };
}