import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware, combineEpics, Epic } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import app, { AppState } from '@/ducks/app';
import appVersion, { pollPublishStatusEpic, AppVersionState } from '@/ducks/appVersion';
import { testDevices, TestDevicesState } from '@/ducks/testDevices';
import settings, { SettingsState } from '@/ducks/settings';
import { appVersionList, AppVersionListState } from '@/ducks/appVersionList';
import auth, { AuthState } from '@/ducks/auth';
import shipApi from '@/services/ship-api';

const rootReducer = combineReducers({
  app,
  appVersion,
  testDevices,
  settings,
  appVersionList,
  auth
});

const rootEpic = combineEpics(pollPublishStatusEpic) as Epic<Action>;

export type RootState = {
  app: AppState;
  appVersion: AppVersionState;
  testDevices: TestDevicesState;
  settings: SettingsState;
  appVersionList: AppVersionListState;
  auth: AuthState;
};

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
export default (initialState: any, _options: any) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { shipApi }
  });

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ shipApi }), epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};
