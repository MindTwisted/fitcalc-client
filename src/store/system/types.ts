export enum Themes {
    Light ='light',
    Dark = 'dark'
}

export interface SystemState {
    lang: string,
    loading: boolean,
    theme: Themes
}

export const SET_LANG = 'SET_LANG';
export const SET_LOADING = 'SET_LOADING';
export const SET_THEME = 'SET_THEME';

interface SetLangAction {
    type: typeof SET_LANG,
    lang: string
}

interface SetLoadingAction {
    type: typeof SET_LOADING,
    loading: boolean
}

interface SetThemeAction {
    type: typeof SET_THEME,
    theme: Themes
}

export type SystemActionTypes = SetLangAction | SetLoadingAction | SetThemeAction;