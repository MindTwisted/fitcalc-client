import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SystemState } from './system/types';
import { systemReducer } from './system/reducers';
import { AuthState } from './auth/types';
import { authReducer } from './auth/reducers';

export interface RootState {
  system: SystemState
  auth: AuthState
}

export const rootReducer = combineReducers<RootState>({
  system: systemReducer,
  auth: authReducer
});

const composeEnhancers = composeWithDevTools({});
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));