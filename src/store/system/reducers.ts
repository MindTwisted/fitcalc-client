import i18n from '../../localization/i18n';
import { Languages, Themes } from '../../types/models';
import { SET_LANG, SET_LOADING, SET_THEME } from '../../types/actionTypes';
import { SystemState } from '../../types/actions';
import { SystemActionTypes } from './types';

const getInitialLanguage = (): Languages => {
  const cachedLanguage = localStorage.getItem('lang');

  if (cachedLanguage !== null && Object.values(Languages).includes(cachedLanguage as Languages)) {
    i18n.changeLanguage(cachedLanguage);

    return cachedLanguage as Languages;
  }

  i18n.changeLanguage(Languages.English);

  return Languages.English;
};

const getInitialTheme = (): Themes => {
  const cachedTheme = localStorage.getItem('theme');
  
  return (cachedTheme !== null) && Object.values(Themes).includes(cachedTheme as Themes) ?
    cachedTheme as Themes : Themes.Light;
};

const initialState: SystemState = {
  lang: getInitialLanguage(),
  loading: false,
  theme: getInitialTheme(),
};

export function systemReducer(state: SystemState = initialState, action: SystemActionTypes): SystemState {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.lang
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
}