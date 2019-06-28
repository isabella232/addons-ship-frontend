import { Dispatch } from 'redux';
import { createAction, createReducer } from 'deox';

import api from '@/services/ship-api';
import { RootState } from '@/store';
import { actionTypeCreator } from '@/utils';
import { Settings } from '@/models';

const $ = actionTypeCreator('SETTINGS');

const _fetchSettings = (appSlug: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  const {
    auth: { token }
  } = getState();

  api.setToken(token);

  dispatch(fetchSettings.next());

  try {
    const settings = await api.getSettings(appSlug);

    dispatch(fetchSettings.complete(settings));
  } catch (error) {
    dispatch(fetchSettings.error(error));
  }
};

export const fetchSettings = Object.assign(_fetchSettings, {
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (settings: Settings) => resolve(settings)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

const _updateSettings = (settings: Settings) => async (dispatch: Dispatch, getState: () => RootState) => {
  const {
    auth: { token }
  } = getState();

  api.setToken(token);

  dispatch(updateSettings.next());

  try {
    await api.updateSettings(settings);

    dispatch(updateSettings.complete(settings));
  } catch (error) {
    dispatch(fetchSettings.error(error));
  }
};

export const updateSettings = Object.assign(_updateSettings, {
  next: createAction($`UPDATE_NEXT`),
  complete: createAction($`UPDATE_COMPLETE`, resolve => (settings: Settings) => resolve(settings)),
  error: createAction($`UPDATE_ERROR`, resolve => (error: Error) => resolve(error))
});

const defaultState: SettingsState = {};

export type SettingsState = Settings;
export const settings = createReducer(defaultState, handleAction => [
  handleAction(fetchSettings.complete, (_, { payload }) => payload)
]);
