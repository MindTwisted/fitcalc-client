import { SET_LANG, SystemActionTypes } from "./types";

export function setLang(lang: string): SystemActionTypes {
  return {
    type: SET_LANG,
    lang
  }
}