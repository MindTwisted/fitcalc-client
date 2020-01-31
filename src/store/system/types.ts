export interface SystemState {
    lang: string
}

export const SET_LANG = 'SET_LANG';

interface SetLangAction {
    type: typeof SET_LANG,
    lang: string
}

export type SystemActionTypes = SetLangAction;