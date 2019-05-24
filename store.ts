import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import chatReducer from '@/ducks/chat';
import { appVersion } from '@/ducks/appVersion';
import { appVersionList } from '@/ducks/appVersionList';

const rootReducer = combineReducers({
  chat: chatReducer,
  appVersion,
  appVersionList
});

export type RootState = ReturnType<typeof rootReducer>;

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
export default (initialState: any, _options: any) => {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
};
