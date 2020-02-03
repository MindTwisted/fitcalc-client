import { combineReducers } from 'redux';
import { systemReducer } from "./system/reducers";
import { SystemState } from "./system/types";

export interface RootState {
  system: SystemState
}

export const rootReducer = combineReducers<RootState>({
  system: systemReducer
});
