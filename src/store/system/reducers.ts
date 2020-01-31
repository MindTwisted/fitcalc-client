import { SET_LANG, SystemActionTypes, SystemState } from "./types";

const initialState: SystemState = {
  lang: 'en'
};

export function systemReducer(state: SystemState = initialState, action: SystemActionTypes): SystemState {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.lang
      };
    default:
      return state;
  }
}