import { Languages, Themes } from '../../types/models';
import { SET_LANG, SET_LOADING, SET_THEME } from '../../types/actionTypes';

export interface SystemState {
    lang: Languages;
    loading: boolean;
    theme: Themes;
}

interface SetLangAction {
    type: typeof SET_LANG;
    lang: Languages;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
    loading: boolean;
}

interface SetThemeAction {
    type: typeof SET_THEME;
    theme: Themes;
}

export type SystemActionTypes = SetLangAction | SetLoadingAction | SetThemeAction;