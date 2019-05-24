import { Dispatch } from 'redux';
import { createAction, createReducer } from 'deox';

import api from '@/services/api';
import { AppVersion } from '@/models';

// TODO create generator thunk, move to @/utils & test
const a = (actionType: TemplateStringsArray) => `APP_VERSION_${actionType}`;

const _fetchAppVersion = (appSlug: string, versionId: string) => async (dispatch: Dispatch) => {
  dispatch(fetchAppVersion.next());

  try {
    const appVersion = await api.getAppVersion(appSlug, versionId);

    dispatch(fetchAppVersion.complete(appVersion));
  } catch (error) {
    dispatch(fetchAppVersion.error(error));
  }
};

export const fetchAppVersion = Object.assign(_fetchAppVersion, {
  next: createAction(a`GET_NEXT`),
  complete: createAction(a`_GET_COMPLETE`, resolve => (appVersion: AppVersion) => resolve(appVersion)),
  error: createAction(a`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

const defaultState = null as AppVersionState;

export type AppVersionState = null | AppVersion;
export const appVersion = createReducer(defaultState, handleAction => [
  handleAction(fetchAppVersion.complete, (_, { payload }) => payload)
]);
