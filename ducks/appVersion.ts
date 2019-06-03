import { Dispatch } from 'redux';
import { createAction, createReducer } from 'deox';

import api from '@/services/ship-api';
import { actionTypeCreator } from '@/utils';
import { AppVersion } from '@/models';

const $ = actionTypeCreator('APP_VERSION');

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
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (appVersion: AppVersion) => resolve(appVersion)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

const _updateAppVersion = (appVersion: AppVersion) => async (dispatch: Dispatch) => {
  dispatch(updateAppVersion.next());

  try {
    const newAppVersion = await api.updateAppVersion(appVersion);

    dispatch(updateAppVersion.complete(newAppVersion));
  } catch (error) {
    dispatch(fetchAppVersion.error(error));
  }
};

export const updateAppVersion = Object.assign(_updateAppVersion, {
  next: createAction($`UPDATE_NEXT`),
  complete: createAction($`UPDATE_COMPLETE`, resolve => (appVersion: AppVersion) => resolve(appVersion)),
  error: createAction($`UPDATE_ERROR`, resolve => (error: Error) => resolve(error))
});

const defaultState = null as AppVersionState;

export type AppVersionState = null | AppVersion;
export const appVersion = createReducer(defaultState, handleAction => [
  handleAction([fetchAppVersion.complete, updateAppVersion.complete], (_, { payload }) => payload)
]);
