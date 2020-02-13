import { SET_LANG, SET_LOADING, SystemActionTypes, SystemState } from './types';

const initialState: SystemState = {
  lang: localStorage.getItem('lang') || 'en',
  loading: false
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
    default:
      return state;
  }
}