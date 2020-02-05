import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SystemState } from './system/types';
import { systemReducer } from './system/reducers';

export interface RootState {
  system: SystemState
}

export const rootReducer = combineReducers<RootState>({
  system: systemReducer
});

const composeEnhancers = composeWithDevTools({});
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));