export interface SystemState {
    lang: string,
    loading: boolean
}

export const SET_LANG = 'SET_LANG';
export const SET_LOADING = 'SET_LOADING';

interface SetLangAction {
    type: typeof SET_LANG,
    lang: string
}

interface SetLoadingAction {
    type: typeof SET_LOADING,
    loading: boolean
}

export type SystemActionTypes = SetLangAction | SetLoadingAction;