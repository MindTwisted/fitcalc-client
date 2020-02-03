import { SET_LANG, SystemActionTypes } from "./types";
import { Dispatch } from "redux";

export function setLang(lang: string): SystemActionTypes {
  return {
    type: SET_LANG,
    lang
  };
}

export function boundSetLang(lang: string): Function {
  return function (dispatch: Dispatch<SystemActionTypes>): void {
    dispatch(setLang(lang));
  }
}