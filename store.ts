import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware, combineEpics, Epic } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import appVersion, { pollPublishStatusEpic } from '@/ducks/appVersion';
import { testDevices } from '@/ducks/testDevices';
import { settings } from '@/ducks/settings';
import { appVersionList } from '@/ducks/appVersionList';
import auth from '@/ducks/auth';
import shipApi from '@/services/ship-api';

const rootReducer = combineReducers({
  appVersion,
  testDevices,
  settings,
  appVersionList,
  auth
});

const rootEpic = combineEpics(pollPublishStatusEpic) as Epic<Action>;

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
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ shipApi }), epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};
